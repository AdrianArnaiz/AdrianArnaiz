---
title: Notes about my ELLIS + Qualcomm AI Research Workshop on GNN + HCML
subtitle: Reading Group Session and Panel about Graph Neural Networks and Human-Centric Machine Learning by distinguished scientist from ELLIS and Qualcomm AI Research in which I was organizer and moderator.

# Summary for listings and search engines
summary: Reading Group Session and Panel about Graph Neural Networks and Human-Centric Machine Learning by distinguished scientist from ELLIS and Qualcomm AI Research in which I was organizer and moderator.

math: true
diagram: true

# Link this post with a project
# projects: []

# Date published
date: "2022-02-25T10:16:00Z"

# Date updated
publishDate: "2022-08-25T10:15:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'From Chouldechova, A., and Roth, A. (2020).'
  placement: 3
  #focal_point: ""
  #preview_only: false

links:
- icon: info
  icon_pack: fas
  name: Official ELLIS Page Event
  url: "https://ellisalicante.org/readingGroup#:~:text=Guest%20talk%20by%20Qualcomm%20AI%20Research"


authors:
- admin

tags:
- Academic
- Machine Learning
- GNN
- HCML

categories:
- Events
- GNN
- HCML
---

# Graph Neural Networks and Human-Centric ML intersection

{{% callout note %}}
TL;DR: GNN is a promising field to include in Human-Centric Machine Learning! It is the most human-like data type, it captures complex relationship and its interpretable!
{{% /callout %}}

{{< hl >}}The past 17th February of 2022, I and my ELLIS Alicante collegues organized a 2-hour Guest Session in the ELLIS HCML Reading Group in which I was moderator of the main panel. This session was organized together with **Qualcomm AI Research**. **The main purpose was to discuss the intersection between Graph Neural Networks and Human-Centric Machine Learning** in a panel made up by distinguished scientist from ELLIS and Qualcomm AI Research,  which **I organized and moderated**.{{< /hl >}} 

> - Speakers : Pim de Haan [^1] , Manuel Gómez Rodríguez [^2], Carlos Castillo [^3] and Efstratios Gavves [^4].
> - Moderator: Adrián Arnaiz Rodríguez
> - Round table about the intersection of Graph Neural Networks and Human-Centric Machine Learning, with the participation of Pim de Hann, Manuel Gómez-Rodríguez, Carlos Castillo and Efstratios Gavves.
[^1] Qualcomm AI Research, University of Amsterdam, ELLIS PhD Student
[^2] Max Plack Institute for Software Systems, ELLIS Fellow
[^3] Universitat Pompeu Fabra, Ellis Fellow
[^4] Qualcomm AI Research, University of Amsterdam, ELLIS Scholar

## GNN and HCML intersection 

This relationship mainly arises from the fact that a lot of human interaction data is expressed as network structured data. Additionally, many advantages of GNNs, such as capturing complex structures between data or information flow, could lead to GNNs being an outstanding tool for addressing HCML problems. Therefore, the main goal is to leverage the whole landscape of GNN [2] to address Algorithmic Fairness problems [3] even with a causal approach [4]. In this intersection, some works has already been done [5, 6].

## Research Round Table

Before the Panel, P. de Haan went through his paper **Natural Graph Networks**[1]. 

After kicking-off the panel, we went through the discussion about the intersection of HCML and GNN, with the participation of leading experts in Algorithmic Fairness and Graph Neural Networks. We started by trying to relate Pim’s work to an HCML problem or solution. First, we came across the fact that his approach could harm minorities in social networks. As their work detects neighbor isomorphy and applies the same transformation to isomorphic neighborhoods, there could be problems with unseen types of neighborhoods, who may be social minorities. On the other harm, if the social minorities are in different part of the graphs, this social minority could be identified by the algorithm as isomorphic communities, creating an optimized kernel for them, so further research would shed light on the social implications of Natural Graph Networks.

Then, we went beyond the paper to more classical Network Science and Graph ML sce- narios, e.g. : structural analysis (e.g. community detection, role analysis, spectral clustering), ranking (e.g. Pagerank), classification (e.g. node, edge and graph), link prediction, dynamic graph prediction, message passing (information diffusion), graph embedding or graph generation, both in normal graphs or more complex ones (e.g. temporal, hyper or signed graphs). A summary of this applications can be seen in some recent surveys [5, 6]. The most classical approach is to apply the known concepts of Algorithmic Fairness to the Graph Literature, but in addition, some of them go a few steps further providing varied and interesting approaches.

One example of the classical Algorithmic Fairness concepts moved into GNN is the well- known Adversarial Debiasing [7], which has been applied into the task of node and graph embed- dings [8, 9] for learning fair representations. However, there are more examples in the literature which contribute with more advanced approaches and suited to the Graph’s scenario, e.g., Individ- ual Fairness in Ranking approaches [10], fair embeddings based on Walk techniques [11, 12], or causal approaches both for node classification (robustness) and XAI [13, 14, 15]. Briefly, most of the potential biases in graph come from the structure of the graph in terms of nodes, edges and features, (V, E, G), and the propagation of the information that we can do using message-passing along the graph.
The message-passing method, which is the main strength of current Graph Theory landscape,
 
can be also a big limitation. The aggregation of information along all the network can lead us to make more accurate and robust predictions, but it can be also the source of many problems. First, the message-passing only adds value if the structure of the network is related with the task we want to solve, otherwise, this message-passing only add noise to the node features and instead would be better to only use the features in our task. In addition, this structure could add even more biased situations when there’s a social component: "[...] there may be networks built on graph data to be homophily-dominant (i.e. nodes in the local neighborhood all belong to the same sensitive class) with minimal connections across nodes of differing sensitive attributes [...] Graph data generated through discriminatory means is either a) missing edges that would have been present in more fair settings, or b) over-representing homophilous edges due to social stratification" by [16, Donald Loveland et al., 2022].

That is the reason why other concepts of the graph structure should be analyzed, such as the assortativity (homophily or heterophily) both in terms of degree features, protected attributes and labels (D, X, Y ), or how is the community structure to analyze if there are low-density small com- munities that can identify a minority group. Some current and promising approaches are starting to edit the structure of the graph – i.e. graph rewiring – to control the information flow with the goal of only aggregating information when it’s needed both in terms of maximizing accuracy or be compliant with some fairness requirement [17, 18, 19, 16, 20]. Within his approach, very few methods has been proposed to explore edge addition and deletion to promote fairness, and most of them relies on optimization problems instead of learning problems.
After that conclusion, we moved to more Human-Centric applications of GNN, where XAI becomes even more important [21, 22]. However, the main XAI goal is neither convince people to blindly trust the algorithm nor to convince people that the decision made by ML model is correct. We’d rather want to enhance the collaboration with them, leading the ML Algorithm to give the best response, but also let it be able to say "I don’t know", or to give an explanation about the decision which the human can interpret to identify if the algorithm is performing robustly or doing it wrong. Other main takeaway of this point is that, apart from the XAI math-related, if we want to give better explanation in the social context, the problem turns even more context-aware.

Specifically, Prof. Carlos Castillo suggested that a critical task for understanding the systems would be analyze the Long-Term effects of an fair algorithm versus a non-fair one, how the feed- back-loops in the interaction human-algorithm can modify the fair landscape and what happens if the humans react to the algorithm – i.e. strategic behaviour – and how would they do it [24, 25, 23]. Some theoretical work has bee done on this, stating that fair algorithms can be less fair than a conventional algorithm when it comes to performative classification with strategic agents [26, 27]. This problem is even more context dependent, because people will behave differently in every scenario and the long-term effects are compounded differently in different contexts (more then 1 iteration, 2-sided game, not same frequency of updating... [28]). One work addresses this problem empirically in a practical setting [29] and analyzes which the long-term effect are in link recommendation setting, when there are communities with different size and different level of assortativity.
 
Finally, we briefly discuss about the role of causality in this scenario. We already know the big importance of causality in Algorithmic Fairness [4]. Counterintuitively, although Structural Causal Models are expressed in terms of Directed Acycled Graphs, the intersection between GNN and Causality is quite unexplored. The reason may be the big difficulty of the field, where there is only one work known trying to relate GNN and Causality [30]. However, the intersection between Fairness, Causality and Graphs is more explored, because some of the most applied Causality- based methods, – such as Counterfactual Data Augmentation [31] or counterfactual explanations
–	has been tried to be applied in graph settings, e.g., improve robustness in classification w.r.t. protected attributes [13, 14, 15] or create Graph XAI methods [32].

## References

[1]	Pim de Haan, Taco S Cohen, and Max Welling. "Natural graph networks". In: Advances in Neural Information Processing Systems 33 (2020), pp. 3636–3646.
[2]	Jie Zhou et al. "Graph neural networks: A review of methods and applications". In: AI Open
1 (2020), pp. 57–81.
[3]	Alycia N Carey and Xintao Wu. "The Fairness Field Guide: Perspectives from Social and Formal Sciences". In: arXiv preprint arXiv:2201.05216 (2022).
[4]	Karima Makhlouf, Sami Zhioua, and Catuscia Palamidessi. "Survey on causal-based ma- chine learning fairness notions". In: arXiv preprint arXiv:2010.09553 (2020).
[5]	Jian Kang and Hanghang Tong. "Fair Graph Mining". In: Proceedings of the 30th ACM International Conference on Information & Knowledge Management. 2021, pp. 4849–4852.
[6]	Suresh Venkatasubramanian et al. "Fairness in Networks, a tutorial". In: Proceedings of the 27th ACM SIGKDD Conference on Knowledge Discovery & Data Mining. 2021.
[7]	Depeng Xu et al. "Achieving causal fairness through generative adversarial networks". In: Proceedings of the Twenty-Eighth International Joint Conference on Artificial Intelligence. 2019.
[8]	Enyan Dai and Suhang Wang. "Say no to the discrimination: Learning fair graph neural networks with limited sensitive attribute information". In: Proceedings of the 14th ACM International Conference on Web Search and Data Mining. 2021, pp. 680–688.
[9]	Avishek Bose and William Hamilton. "Compositional fairness constraints for graph embed- dings". In: International Conference on Machine Learning. PMLR. 2019, pp. 715–724.
[10]	Yushun Dong et al. "Individual fairness for graph neural networks: A ranking based ap- proach". In: Proceedings of the 27th ACM SIGKDD Conference on Knowledge Discovery & Data Mining. 2021, pp. 300–310.
[11]	Tahleen Rahman et al. "Fairwalk: Towards Fair Graph Embedding". In: Proceedings of the Twenty-Eighth International Joint Conference on Artificial Intelligence, IJCAI-19. Interna- tional Joint Conferences on Artificial Intelligence Organization, July 2019
[12]	Ahmad Khajehnejad et al. "CrossWalk: Fairness-enhanced Node Representation Learning". In: arXiv preprint arXiv:2105.02725 (2021).
[13]	Chirag Agarwal, Himabindu Lakkaraju, and Marinka Zitnik. "Towards a unified framework for fair and stable graph representation learning". In: Uncertainty in Artificial Intelligence. PMLR. 2021, pp. 2114–2124.
[14]	Jing Ma et al. "Learning Fair Node Representations with Graph Counterfactual Fairness". In: arXiv preprint arXiv:2201.03662 (2022).
[15]	Ana Lucic et al. "Cf-gnnexplainer: Counterfactual explanations for graph neural networks". In: arXiv preprint arXiv:2102.03322 (2021).
[16]	Donald Loveland et al. FairEdit: Preserving Fairness in Graph Neural Networks through Greedy Graph Editing. 2022. arXiv: 2201.03681 [cs.LG].
[17]	Yushun Dong et al. "EDITS: Modeling and Mitigating Data Bias for Graph Neural Net-
works". In: arXiv preprint arXiv:2108.05233 (2021).
[18]	Jian Kang et al. "Inform: Individual fairness on graph mining". In: Proceedings of the 26th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining. 2020, pp. 379–389.
[19]	Indro Spinelli et al. "FairDrop: Biased Edge Dropout for Enhancing Fairness in Graph Rep- resentation Learning". In: IEEE Transactions on Artificial Intelligence (2021).
[20]	Peizhao Li et al. "On dyadic fairness: Exploring and mitigating bias in graph connections". In: International Conference on Learning Representations. 2020.
[21]	Hao Yuan et al. "Explainability in graph neural networks: A taxonomic survey". In: arXiv preprint arXiv:2012.15445 (2020).
[22]	Zhitao Ying et al. "Gnnexplainer: Generating explanations for graph neural networks". In:
Advances in neural information processing systems 32 (2019).
[23]	Moritz Hardt et al. "Strategic classification". In: Proceedings of the 2016 ACM conference on innovations in theoretical computer science. 2016, pp. 111–122.
[24]	Stratis Tsirtsis et al. "Optimal decision making under strategic behavior". In: arXiv preprint arXiv:1905.09239 (2019).
[25]	Stratis Tsirtsis and Manuel Gomez Rodriguez. "Decisions, counterfactual explanations and strategic behavior". In: Advances in Neural Information Processing Systems 33 (2020), pp. 16749–16760.
[26]	Lydia T Liu et al. "Delayed impact of fair machine learning". In: International Conference on Machine Learning. PMLR. 2018, pp. 3150–3158.
[27]	Andrew Estornell et al. Group-Fair Classification with Strategic Agents. 2022. arXiv: 2112. 02746 [cs.MA].
[28]	Tijana Zrnic et al. "Who Leads and Who Follows in Strategic Classification?" In: Advances in Neural Information Processing Systems 34 (2021).
[29]	Francesco Fabbri et al. "Exposure Inequality in People Recommender Systems: The Long- Term Effects". In: arXiv preprint arXiv:2112.08237 (2021).
[30]	Matej Zecevic et al. "Relating graph neural networks to structural causal models". In: arXiv preprint arXiv:2109.04173 (2021).
[31]	Ran Zmigrod et al. "Counterfactual Data Augmentation for Mitigating Gender Stereotypes in Languages with Rich Morphology". In: Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics. Florence, Italy: Association for Computational Linguistics, July 2019, pp. 1651–1661. DOI: 10.18653/v1/P19-1161. URL: https://aclanthology.org/P19-1161.
[32]	Wanyu Lin, Hao Lan, and Baochun Li. "Generative causal explanations for graph neural networks". In: International Conference on Machine Learning. PMLR. 2021, pp. 6666– 6679.
