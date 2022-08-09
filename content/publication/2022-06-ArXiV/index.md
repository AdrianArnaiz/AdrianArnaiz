---
title: "Mapping the scientific structure of Organization and management of enterprises using complex networks"
authors:
- admin
- Ahmed Begga
- Francisco Escolano
- Nuria Oliver

date: "2022-06-15T00:00:00Z"
doi: "https://doi.org/10.48550/arXiv.2206.07369"

# Schedule page publish date (NOT publication's date).
publishDate: "2022-06-15T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["2"]

# Publication name and optional abbreviated publication name.
publication: ArXiV Preprint
publication_short: In *ArXiV*

abstract: Graph Neural Networks (GNNs) have been shown to achieve competitive results to tackle graph-related tasks, such as node and graph classification, link prediction and node and graph clustering in a variety of domains. Most GNNs use a message passing framework and hence are called MPNNs. Despite their promising results, MPNNs have been reported to suffer from over-smoothing, over-squashing and under-reaching. Graph rewiring and graph pooling have been proposed in the literature as solutions to address these limitations. However, most state-of-the-art graph rewiring methods fail to preserve the global topology of the graph, are not differentiable (inductive) and require the tuning of hyper-parameters. In this paper, we propose **DiffWire**, a novel framework for graph rewiring in MPNNs that is principled, fully differentiable and parameter-free by leveraging the Lovász bound. Our approach provides a unified theory for graph rewiring by proposing two new, complementary layers in MPNNs. First, **CTLayer**, a layer that learns the commute times and uses them as a relevance function for edge re-weighting; second, **GAPLayer**, a layer to optimize the spectral gap, depending on the nature of the network and the task at hand. We empirically validate the value of our proposed approach and each of these layers separately with benchmark datasets for graph classification. DiffWire brings together the learnability of commute times to related definitions of curvature, opening the door to the development of more expressive MPNNs.

# Summary. An optional shortened abstract.
summary: Theoretical and empirical framework to analyze and perform graph rewiring in a principled way. Also, proposal of calulation of Commute Times (resistance) in a GNN layer and Bottleneck minimizarion using Spectral gradients.

tags:
- Graph Neural Networks
- Spectral Graph Theory
- Pattern recognition
- Graph Rewiring
- Graph Diffusion

featured: false

links:
url_pdf: 'https://arxiv.org/pdf/2206.07369.pdf'
url_code: 'https://anonymous.4open.science/r/DiffWireNeurIPS22/readme.md'
url_dataset: ''
url_poster: 'https://ellisalicante.org/publications/arnaiz2022diffwire-en/'
url_project: ''
url_slides: ''
url_source: 'https://arxiv.org/abs/2206.07369' 
# '#' para ir a la pagina inicial
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Example of rewired graphs and schema of proposed GNN layers'
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

{{% callout note %}}
Click the *Cite* button above to show and copy bibtex reference.
{{% /callout %}}

