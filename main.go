package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/yuin/goldmark"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/parser"
)

// Config
const (
	ContentDir   = "content"
	OutputDir    = "posts"
	TemplateFile = "_template.html"
	DBFile       = "posts.json"
)

// PostMetadata represents the Frontmatter in your MD files
type PostMetadata struct {
	Title       string   `json:"title"`
	Date        string   `json:"date"`
	Category    string   `json:"category"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
}

// DBStructure represents your posts.json schema
type DBStructure struct {
	Technical   []PostEntry `json:"technical"`
	CaseStudies []PostEntry `json:"case-studies"`
	BookReviews []PostEntry `json:"book-reviews"`
	SATNotes    []PostEntry `json:"sat-notes"`
}

type PostEntry struct {
	Title       string   `json:"title"`
	Date        string   `json:"date"`
	Description string   `json:"description"`
	Link        string   `json:"link"`
	Tags        []string `json:"tags"`
}

func main() {
	// 1. Initialize Markdown parser with Frontmatter support
	markdown := goldmark.New(
		goldmark.WithExtensions(
			meta.Meta,
		),
	)

	// 2. Read the HTML Template
	tmplContent, err := ioutil.ReadFile(TemplateFile)
	if err != nil {
		fmt.Printf("Error reading template: %v\n", err)
		return
	}
	// Parse the template string
	htmlTmpl, err := template.New("post").Parse(string(tmplContent))
	if err != nil {
		fmt.Printf("Error parsing template: %v\n", err)
		return
	}

	// 3. Initialize Database
	db := DBStructure{
		Technical:   []PostEntry{},
		CaseStudies: []PostEntry{},
		BookReviews: []PostEntry{},
		SATNotes:    []PostEntry{},
	}

	// 4. Walk through Content Directory
	err = filepath.Walk(ContentDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !strings.HasSuffix(info.Name(), ".md") {
			return nil
		}

		// Read Markdown File
		source, err := ioutil.ReadFile(path)
		if err != nil {
			return err
		}

		// Convert Markdown to HTML & Extract Meta
		var buf bytes.Buffer
		context := parser.NewContext()
		if err := markdown.Convert(source, &buf, parser.WithContext(context)); err != nil {
			return err
		}
		
		metaData := meta.Get(context)
		
		// Safely extract metadata fields
		title := getString(metaData, "title")
		date := getString(metaData, "date")
		category := getString(metaData, "category")
		desc := getString(metaData, "description")
		tags := getStringSlice(metaData, "tags")

		// Determine Output Path
		// e.g., posts/sat-notes/filename.html
		cleanName := strings.TrimSuffix(info.Name(), ".md")
		catDir := filepath.Join(OutputDir, category)
		os.MkdirAll(catDir, 0755)
		
		outPath := filepath.Join(catDir, cleanName+".html")
		
		// Render Final HTML using text/template
		// We use template.HTML for content to prevent escaping the HTML tags we just generated
		data := map[string]interface{}{
			"Title":    title,
			"Date":     date,
			"Category": category,
			"Content":  template.HTML(buf.String()),
		}

		var finalHTML bytes.Buffer
		if err := htmlTmpl.Execute(&finalHTML, data); err != nil {
			return err
		}

		// Write HTML File
		if err := ioutil.WriteFile(outPath, finalHTML.Bytes(), 0644); err != nil {
			return err
		}
		fmt.Printf("[+] Built: %s\n", outPath)

		// Add to Database Struct
		entry := PostEntry{
			Title:       title,
			Date:        date,
			Description: desc,
			Link:        fmt.Sprintf("posts/%s/%s.html", category, cleanName),
			Tags:        tags,
		}

		switch category {
		case "sat-notes":
			db.SATNotes = append(db.SATNotes, entry)
		case "technical":
			db.Technical = append(db.Technical, entry)
		case "case-studies":
			db.CaseStudies = append(db.CaseStudies, entry)
		case "book-reviews":
			db.BookReviews = append(db.BookReviews, entry)
		default:
			// Default bucket or handle error
			db.Technical = append(db.Technical, entry)
		}

		return nil
	})

	if err != nil {
		fmt.Printf("Error walking path: %v\n", err)
	}

	// 5. Write posts.json
	jsonData, _ := json.MarshalIndent(db, "", "  ")
	ioutil.WriteFile(DBFile, jsonData, 0644)
	fmt.Println("[SUCCESS] Database updated.")
}

// Helpers to handle the interface{} types from goldmark-meta
func getString(m map[string]interface{}, key string) string {
	if v, ok := m[key]; ok {
		return fmt.Sprintf("%v", v)
	}
	return ""
}

func getStringSlice(m map[string]interface{}, key string) []string {
	if v, ok := m[key]; ok {
		if slice, ok := v.([]interface{}); ok {
			strs := make([]string, len(slice))
			for i, s := range slice {
				strs[i] = fmt.Sprintf("%v", s)
			}
			return strs
		}
	}
	return []string{}
}