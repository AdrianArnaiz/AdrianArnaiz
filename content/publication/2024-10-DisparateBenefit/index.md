---
title: "The Disparate Benefits of Deep Ensembles"
authors:
- Kajetan Schweighofer
- admin,
- Sepp Hochreiter
- Nuria Oliver

date: "2024-10-17T00:00:00Z"
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2024-10-17T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["3"]

# Publication name and optional abbreviated publication name.
publication: Preprint
publication_short: Preprint

abstract: "Ensembles of Deep Neural Networks, Deep Ensembles, are widely used as a simple way to boost predictive performance. However, their impact on algorithmic fairness is not well understood yet. Algorithmic fairness investigates how a model's performance varies across different groups, typically defined by protected attributes such as age, gender, or race. In this work, we investigate the interplay between the performance gains from Deep Ensembles and fairness. Our analysis reveals that they unevenly favor different groups in what we refer to as a disparate benefits effect. We empirically investigate this effect with Deep Ensembles applied to popular facial analysis and medical imaging datasets, where protected group attributes are given and find that it occurs for multiple established group fairness metrics, including statistical parity and equal opportunity. Furthermore, we identify the per-group difference in predictive diversity of ensemble members as the potential cause of the disparate benefits effect. Finally, we evaluate different approaches to reduce unfairness due to the disparate benefits effect. Our findings show that post-processing is an effective method to mitigate this unfairness while preserving the improved performance of Deep Ensembles."

# Summary. An optional shortened abstract.
summary: Deep Ensembles can improve performance but may also introduce fairness issues, unevenly benefiting different groups. This study identifies that effect, propose a explanation based on predictive diversity and explores mitigation techniques that can reduce unfairness while preserving performance gains.

tags:
- Deep Ensembles
- Algorithmic Fairness

featured: false

links:
url_pdf: 'https://arxiv.org/abs/2410.13831'
url_code: 'https://github.com/ml-jku/disparate-benefits'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_PapersWithCode: 'https://paperswithcode.com/paper/the-disparate-benefits-of-deep-ensembles'
url_source: '' 
# '#' para ir a la pagina inicial
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Disparata Benefits of Deep Ensembles'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
# projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: ""
---

<blockquote class="twitter-tweet">
  <a href="https://twitter.com/kschweig_/status/1848257945596768258"></a> 
</blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

{{% callout note %}}
Click the *Cite* button above to show and copy bibtex reference.
{{% /callout %}}

