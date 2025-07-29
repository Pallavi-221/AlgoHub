window.onload = async function () {
  const response = await fetch("data/problems.json");
  const problems = await response.json();
  const listDiv = document.getElementById("problem-list");
  const filter = document.getElementById("topic-filter");
  const searchBar = document.getElementById("search-bar");

  function render(problemsToShow) {
    listDiv.innerHTML = "";
    problemsToShow.forEach(p => {
      const div = document.createElement("div");
      div.className = "problem-card";
      div.innerHTML = `
        <h3>${p.title}</h3>
        <p><strong>Topic:</strong> ${p.topic}</p>
        <p><strong>Difficulty:</strong> ${p.difficulty}</p>
        <p>${p.description}</p>
        <pre><code>${p.solution}</code></pre>
        <p><strong>Time:</strong> ${p.timeComplexity}, <strong>Space:</strong> ${p.spaceComplexity}</p>
      `;
      listDiv.appendChild(div);
    });
  }

  // Initial render
  render(problems);

  // Topic filter
  filter.onchange = () => {
    const value = filter.value;
    if (value === "all") render(problems);
    else render(problems.filter(p => p.topic === value));
  };

  // Search functionality
  searchBar.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = problems.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword)
    );
    render(filtered);
  });
};
