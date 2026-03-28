// Initial Data (8 Meaningful Cards)
let jobs = [
    { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "৳1200k", description: "Develop modern user interfaces using Tailwind and React.", status: "all" },
    { id: 2, companyName: "WebFlow Agency", position: "Web Designer & Developer", location: "New York", type: "On-site", salary: "৳14000k", description: "Build scalable microservices and database solutions.", status: "all" },
    { id: 3, companyName: "DataViz Solutions", position: "UI/UX Designer", location: "Hybrid", type: "Contract", salary: "৳800/hr", description: "Design intuitive user flows and high-fidelity prototypes.", status: "all" },
    { id: 4, companyName: "SecureNet", position: "Security Analyst", location: "Remote", type: "Full-time", salary: "৳20000k", description: "Monitor systems and perform penetration testing audits.", status: "all" },
    { id: 5, companyName: "DataGrid", position: "Data Scientist", location: "Austin", type: "Full-time", salary: "৳25000k", description: "Apply machine learning models to complex financial data.", status: "all" },
    { id: 6, companyName: "SwiftPay", position: "Mobile Developer", location: "Chicago", type: "Hybrid", salary: "৳27000k", description: "Maintain and improve our core iOS and Android apps.", status: "all" },
    { id: 7, companyName: "GreenLoop", position: "Product Manager", location: "Remote", type: "Full-time", salary: "৳25800k", description: "Lead the roadmap for sustainable energy software products.", status: "all" },
    { id: 8, companyName: "MarketLink", position: "SEO Specialist", location: "London", type: "Part-time", salary: "৳27000k", description: "Optimize search engine rankings and content strategy.", status: "all" }
];

let activeTab = 'all';

// Main Render Function
function render() {
    const grid = document.getElementById('job-grid');
    const filteredJobs = activeTab === 'all' ? jobs : jobs.filter(j => j.status === activeTab);
    
    // Update Dashboard Counts
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
    document.getElementById('section-count').innerText = filteredJobs.length;

    // Handle Empty States
    if (filteredJobs.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-16 text-center">
                <i class="fa-solid fa-folder-open text-6xl text-slate-200 mb-4"></i>
                <h3 class="text-xl font-bold text-slate-400">No Jobs Available</h3>
                <p class="text-slate-400 italic">Select 'All' to see all opportunities.</p>
            </div>`;
        return;
    }

    // Render Cards
    grid.innerHTML = filteredJobs.map(job => `
        <div class="card bg-white border border-slate-100 p-6 job-card relative group">
            <button onclick="deleteJob(${job.id})" class="absolute top-4 right-4 text-slate-300 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-lg text-slate-800">${job.companyName}</h3>
                <span class="badge badge-sm badge-ghost font-bold">${job.type}</span>
            </div>
            <p class="text-primary font-bold text-sm mb-3">${job.position}</p>
            <div class="flex gap-4 text-xs text-slate-500 mb-4">
                <span><i class="fa-solid fa-location-dot mr-1"></i>${job.location}</span>
                <span><i class="fa-solid fa-sack-dollar mr-1"></i>${job.salary}</span>
            </div>
            <p class="text-sm text-slate-600 line-clamp-2 mb-6">${job.description}</p>
            <div class="flex gap-2 mt-auto">
                <button onclick="updateStatus(${job.id}, 'interview')" 
                    class="btn btn-sm ${job.status === 'interview' ? 'btn-info' : 'btn-outline btn-info'}">
                    Interview
                </button>
                <button onclick="updateStatus(${job.id}, 'rejected')" 
                    class="btn btn-sm ${job.status === 'rejected' ? 'btn-error' : 'btn-outline btn-error'}">
                    Rejected
                </button>
            </div>
        </div>
    `).join('');
}

// Global Actions
window.switchTab = (tab) => {
    activeTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
    document.getElementById(`tab-${tab}`).classList.add('tab-active');
    render();
};

window.updateStatus = (id, newStatus) => {
    const index = jobs.findIndex(j => j.id === id);
    // Toggle Status: Moves the card to the specific tab and updates dashboard count
    jobs[index].status = newStatus;
    render();
};

window.deleteJob = (id) => {
    jobs = jobs.filter(j => j.id !== id);
    render();
};

// Start
render();