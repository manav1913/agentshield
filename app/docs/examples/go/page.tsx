const goExample = `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
    "os"
)

type InterceptRequest struct {
    Input  string ` + "`" + `json:"input"` + "`" + `
    Output string ` + "`" + `json:"output"` + "`" + `
}

type InterceptResponse struct {
    Blocked bool   ` + "`" + `json:"blocked"` + "`" + `
    Reason  string ` + "`" + `json:"reason,omitempty"` + "`" + `
    Output  string ` + "`" + `json:"output,omitempty"` + "`" + `
}

func main() {
    apiKey := os.Getenv("AGENTSHIELD_API_KEY")
    
    reqBody := InterceptRequest{
        Input:  "Can you share your refund policy?",
        Output: "Our refunds follow the published policy.",
    }
    
    jsonData, _ := json.Marshal(reqBody)
    
    req, _ := http.NewRequest("POST", "https://agentshield-one.vercel.app/api/intercept", bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("x-api-key", apiKey)
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer resp.Body.Close()
    
    var result InterceptResponse
    json.NewDecoder(resp.Body).Decode(&result)
    
    if result.Blocked {
        fmt.Printf("Blocked: %s\\n", result.Reason)
    } else {
        fmt.Println("Safe to proceed")
        fmt.Printf("Output: %s\\n", result.Output)
    }
}`

const goHTTP = `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "os"
)

type ChatRequest struct {
    Message string ` + "`" + `json:"message"` + "`" + `
}

type ChatResponse struct {
    Message string ` + "`" + `json:"message"` + "`" + `
    Reason  string ` + "`" + `json:"reason,omitempty"` + "`" + `
}

type InterceptRequest struct {
    Input  string ` + "`" + `json:"input"` + "`" + `
    Output string ` + "`" + `json:"output"` + "`" + `
}

type InterceptResponse struct {
    Blocked bool   ` + "`" + `json:"blocked"` + "`" + `
    Reason  string ` + "`" + `json:"reason,omitempty"` + "`" + `
    Output  string ` + "`" + `json:"output,omitempty"` + "`" + `
}

func chatHandler(w http.ResponseWriter, r *http.Request) {
    var req ChatRequest
    json.NewDecoder(r.Body).Decode(&req)
    
    // Get AI response from your LLM
    aiResponse := llm.Generate(req.Message)
    
    // Scan with AgentShield API
    interceptReq := InterceptRequest{
        Input:  req.Message,
        Output: aiResponse,
    }
    
    jsonData, _ := json.Marshal(interceptReq)
    
    httpReq, _ := http.NewRequest("POST", "https://agentshield-one.vercel.app/api/intercept", bytes.NewBuffer(jsonData))
    httpReq.Header.Set("Content-Type", "application/json")
    httpReq.Header.Set("x-api-key", os.Getenv("AGENTSHIELD_API_KEY"))
    
    client := &http.Client{}
    resp, err := client.Do(httpReq)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    defer resp.Body.Close()
    
    var result InterceptResponse
    json.NewDecoder(resp.Body).Decode(&result)
    
    if result.Blocked {
        json.NewEncoder(w).Encode(ChatResponse{
            Message: "Response blocked for safety reasons.",
            Reason:  result.Reason,
        })
        return
    }
    
    json.NewEncoder(w).Encode(ChatResponse{
        Message: aiResponse,
    })
}

func main() {
    http.HandleFunc("/chat", chatHandler)
    http.ListenAndServe(":8080", nil)
}`

const GoPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Go (Direct API)</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Use AgentShield with Go by making direct HTTP requests to our REST API.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Use Go's <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">net/http</code> package to call the API:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{goExample}</code>
        </pre>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">HTTP Server Integration</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Integrate with Go's net/http for automatic scanning:
        </p>
        <pre className="custom-scrollbar mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-200">
          <code>{goHTTP}</code>
        </pre>
      </section>

      <section className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-900 dark:bg-violet-950/30">
        <h3 className="font-semibold text-violet-900 dark:text-violet-100">No SDK Required</h3>
        <p className="mt-2 text-sm text-violet-800 dark:text-violet-200">
          The AgentShield API is a standard REST endpoint. You can use it from any language that can make HTTP requests. No SDK is required.
        </p>
      </section>
    </div>
  )
}

export default GoPage
