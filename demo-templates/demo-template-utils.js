// Demo Template Utilities
const DemoUtils = {
    
    // Replace placeholders in template
    populateTemplate(template, data) {
        let populated = template;
        
        // Replace all placeholders
        for (const [key, value] of Object.entries(data)) {
            const placeholder = `[${key.toUpperCase()}]`;
            populated = populated.replace(new RegExp(placeholder, 'g'), value);
        }
        
        // Add timestamp
        populated = populated.replace('[TIMESTAMP]', 
            Date.now().toString().slice(-6));
        
        return populated;
    },
    
    // Calculate health score based on metrics
    calculateHealthScore(metrics) {
        const weights = {
            performance: 0.3,
            seo: 0.25,
            security: 0.2,
            mobile: 0.15,
            accessibility: 0.1
        };
        
        let score = 0;
        for (const [metric, value] of Object.entries(metrics)) {
            score += value * (weights[metric] || 0.1);
        }
        
        return Math.min(Math.round(score), 100);
    },
    
    // Generate random but realistic issues
    generateDemoIssues(domain) {
        const issues = [
            {
                title: "Slow Page Load Speed",
                current: `${(Math.random() * 3 + 2.5).toFixed(1)}s`,
                target: "< 2s",
                impact: `-${Math.floor(Math.random() * 20) + 25}% mobile conversion rate`,
                severity: "high"
            },
            {
                title: "Poor Mobile Optimization",
                current: `${Math.floor(Math.random() * 30) + 50}/100`,
                target: "85+/100",
                impact: `${Math.floor(Math.random() * 30) + 35}% of mobile visitors leave immediately`,
                severity: "high"
            },
            {
                title: "Missing SEO Meta Structure",
                current: `${Math.floor(Math.random() * 30) + 40}% of pages`,
                target: "100% coverage",
                impact: `+${Math.floor(Math.random() * 30) + 50}% organic traffic potential`,
                severity: "medium"
            },
            {
                title: "Security Headers Missing",
                current: `${Math.floor(Math.random() * 5) + 1}/8`,
                target: "8/8",
                impact: "Increased vulnerability risk",
                severity: "critical"
            },
            {
                title: "Broken Internal Links",
                current: `${Math.floor(Math.random() * 15) + 5} found`,
                target: "0",
                impact: "Poor user experience and SEO",
                severity: "medium"
            }
        ];
        
        // Shuffle and return 3 issues for demo
        return issues.sort(() => Math.random() - 0.5).slice(0, 3);
    },
    
    // Get competitor for comparison
    getCompetitor(domain) {
        const competitors = [
            "industry-leader.com",
            "top-competitor.net",
            "market-dominator.io",
            "growth-champion.co",
            "innovation-pioneer.tech"
        ];
        
        return competitors[Math.floor(Math.random() * competitors.length)];
    },
    
    // Generate metrics for comparison table
    generateMetrics(domain) {
        return {
            loadSpeed: (Math.random() * 3 + 2.5).toFixed(1),
            mobileScore: Math.floor(Math.random() * 30) + 50,
            seoScore: Math.floor(Math.random() * 30) + 55,
            conversionRate: (Math.random() * 2 + 1.5).toFixed(1),
            industryAvgSpeed: (Math.random() * 1 + 1.8).toFixed(1),
            industryAvgMobile: Math.floor(Math.random() * 15) + 75,
            industryAvgSEO: Math.floor(Math.random() * 15) + 75,
            industryAvgConversion: (Math.random() * 2 + 3.0).toFixed(1)
        };
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.DemoUtils = DemoUtils;
}