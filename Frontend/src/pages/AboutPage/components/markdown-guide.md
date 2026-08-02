# The Complete Markdown Syntax Guide

This document demonstrates virtually every feature available in standard and GitHub Flavored Markdown (GFM).

---

## 1. Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

Alternate syntax for H1 and H2:

Heading Level 1
===============

Heading Level 2
---------------

---

## 2. Text Emphasis

*Italic text* or _italic text_

**Bold text** or __bold text__

***Bold and italic*** or ___bold and italic___

~~Strikethrough text~~

Combine them: **bold and _nested italic_ together**

You can also use `inline code` within a sentence.

---

## 3. Paragraphs and Line Breaks

This is a paragraph. Markdown collapses single line breaks,
so this line joins the one above it into a single paragraph.

To force a line break within a paragraph,  
end a line with two or more spaces (like above).

Or leave a completely blank line to start a new paragraph.

---

## 4. Lists

### Unordered Lists

- Item one
- Item two
  - Nested item 2a
  - Nested item 2b
    - Deeply nested item
- Item three

Alternate bullet markers:

* Item using asterisk
+ Item using plus sign

### Ordered Lists

1. First item
2. Second item
   1. Nested first
   2. Nested second
3. Third item

### Task Lists (GFM)

- [x] Completed task
- [x] Another completed task
- [ ] Incomplete task
- [ ] Another incomplete task

---

## 5. Links

[Inline link](https://www.example.com)

[Link with a title](https://www.example.com "Example Site")

[Reference-style link][ref-1]

<https://www.example.com> (automatic/bare URL link)

Email autolink: <someone@example.com>

[ref-1]: https://www.example.com "Reference link title"

---

## 6. Images

![Alt text for an image](https://via.placeholder.com/150 "Optional title")

Reference-style image:

![Alt text][image-ref]

[image-ref]: https://via.placeholder.com/150 "Reference image"

Wrapping an image in a link:

[![Alt text](https://via.placeholder.com/100)](https://www.example.com)

---

## 7. Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also possible.
>
> Back to the outer level. Blockquotes can contain **other markdown**, like *emphasis* and lists:
> - Point one
> - Point two

---

## 8. Code

Inline code: use `backticks` around text.

Fenced code block (no language specified):

```
plain text code block
no syntax highlighting
```

Fenced code block with syntax highlighting:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

Indented code block (4 spaces, alternative to fencing):

    this is also a code block
    using indentation instead of fences

---

## 9. Tables (GFM)

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:---------------:|---------------:|
| Row 1, Col 1 | Row 1, Col 2    | Row 1, Col 3   |
| Row 2, Col 1 | Row 2, Col 2    | Row 2, Col 3   |
| A             | B               | C              |

Simple table without alignment markers:

| Name  | Role      |
| ----- | --------- |
| Alice | Engineer  |
| Bob   | Designer  |

---

## 10. Horizontal Rules

Three or more hyphens, asterisks, or underscores on their own line:

---
***
___

---

## 11. Escaping Characters

Use a backslash to display literal markdown characters:

\*not italic\*, \# not a heading, \[not a link\]

Escapable characters include: \\ \` \* \_ \{ \} \[ \] \( \) \# \+ \- \. \!

---

## 12. Footnotes (GFM / Pandoc extension)

Here is a sentence with a footnote reference.[^1]

Here is another footnote reference.[^note]

[^1]: This is the first footnote's content.
[^note]: This is a named footnote, which can also contain multiple lines
    and even code blocks if indented properly.

---

## 13. Definition Lists (extension, supported by some renderers)

Term 1
: Definition for term 1

Term 2
: First definition for term 2
: Second definition for term 2

---

## 14. HTML in Markdown

Most markdown renderers allow raw HTML to pass through:

<div style="padding: 10px; border: 1px solid #ccc;">
  This is a raw HTML block inside a markdown file.
</div>

You can also use inline HTML like <mark>highlighted text</mark> or <sub>subscript</sub> and <sup>superscript</sup>.

---

## 15. Emoji (GFM shorthand, renderer-dependent)

:smile: :rocket: :tada: :+1:

---

## 16. Automatic URL Linking and Line Breaks in Tables

| Feature | Supported |
|---|---|
| Links in tables | [Yes](https://example.com) |
| **Bold** in tables | Yes |
| `Code` in tables | Yes |

---

## 17. Collapsible Sections (HTML + Markdown combo, GFM supports this on GitHub)

<details>
<summary>Click to expand</summary>

Hidden content goes here. This can include:
- Lists
- **Formatted text**
- Even code blocks

```
example code
```

</details>

---

## 18. Comments (not rendered in output, HTML-style)

<!-- This is a markdown comment. It will not appear in the rendered output. -->

---

## 19. Superscript / Subscript (renderer-dependent, not core spec)

X^2^ (superscript, some renderers)

H~2~O (subscript, some renderers)

---

## 20. Table of Contents (manual, using anchor links)

- [Headings](#1-headings)
- [Text Emphasis](#2-text-emphasis)
- [Lists](#4-lists)
- [Links](#5-links)
- [Tables](#9-tables-gfm)

(Anchor links are auto-generated from heading text by most renderers — lowercase, spaces replaced with hyphens, punctuation stripped.)

---

## Notes

- Features under "GFM" (GitHub Flavored Markdown) work on GitHub, GitLab, and many modern renderers, but are not part of the original core Markdown spec.
- Features marked "renderer-dependent" (superscript/subscript, emoji shortcodes, definition lists) may not render correctly everywhere — check your target platform (GitHub, Obsidian, Jupyter, static site generators, etc.) if these matter to you.
- Plain markdown (headings, emphasis, lists, links, images, blockquotes, code, horizontal rules) is universally supported.
