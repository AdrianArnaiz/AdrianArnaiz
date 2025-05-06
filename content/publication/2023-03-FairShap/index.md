---
title: "FairShap: A Data Re-weighting Approach for Algorithmic Fairness based on Shapley Values"
authors:
- admin
- Nuria Oliver

date: "2024-03-04T00:00:00Z"
doi: "https://openreview.net/forum?id=ivf1QaxEGQ"

# Schedule page publish date (NOT publication's date).
publishDate: "2023-06-24T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: ICLR 2024 Workshop on Data-centric Machine Learning Research (DMLR)
publication_short: In *DMLR workshop @ ICLR 2024*

abstract: "Algorithmic fairness is of utmost societal importance, yet state-of-the-art largescale machine learning models require training with massive datasets that are frequently biased. In this context, pre-processing methods that focus on modeling and correcting bias in the data emerge as valuable approaches. In this paper, we propose **FairShap**, a novel instance-level data re-weighting method for fair algorithmic decision-making through data valuation by means of Shapley Values. **FairShap** is model-agnostic and easily interpretable. It measures the contribution of each training data point to a predefined fairness metric. We empirically validate **FairShap** on several state-of-the-art datasets of different nature, with a variety of training scenarios and machine learning models and show how it yields fairer models with similar levels of accuracy than the baselines. We illustrate **FairShap**’s interpretability by means of histograms and latent space visualizations and perform a utility-fairness study. We believe that **FairShap** represents a promising direction in interpretable and model-agnostic approaches to algorithmic fairness that yield competitive accuracy even when only biased datasets are available"

# Summary. An optional shortened abstract.
summary: FairShap, i.e. Fair Shapley Values, is a family of data valuation functions for Algorithmic Fairness based on Game Theory which can be used as a novel, interpretable, pre-processing and model-agnostic (re-weighting) method for fair algorithmic decision-making.

tags:
- Algorithmic Fairness
- Data Valuation
- Shapley Values
- Game Theory

featured: true

links:
url_pdf: 'https://arxiv.org/pdf/2303.01928.pdf'
url_code: 'https://anonymous.4open.science/r/fair-shap'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: 'https://youtu.be/EYT_kTQE1E8?t=3393'
url_source: 'https://arxiv.org/pdf/2303.01928.pdf' 
# '#' para ir a la pagina inicial
url_video: 'https://youtu.be/EYT_kTQE1E8?t=3393'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Pipeline and results of Fair Shapley Values'
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

