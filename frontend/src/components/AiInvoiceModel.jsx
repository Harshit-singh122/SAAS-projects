import React, { useEffect, useState } from "react"
import { aiInvoiceModalStyles } from "../assets/dummystyle"
import GeminiIcon from "./GeminiIcon"
import AnimatedButton from "../assets/GenerateBtn/Gbtn"

const AiInvoiceModel = ({ open, onClose, onGenerated, initialText = "" }) => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (open) {
      setText(initialText || "")
      setError("")
      setLoading(false)
    }
  }, [open, initialText])

  if (!open) return null

  async function handleGenerateClick() {
    if (loading) return // 🚫 prevent double call

    setError("")
    const raw = (text || "").trim()

    if (!raw) {
      setError("Please paste invoice text to generate from AI")
      return
    }

    try {
      setLoading(true)
      await onGenerated(raw) // ✅ IMPORTANT FIX
    } catch (err) {
      console.error("On generation failed", err)

      const msg =
        err?.message ||
        (typeof err === "string" ? err : "Failed to generate invoice")

      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={aiInvoiceModalStyles.overlay}>
      <div
        className={aiInvoiceModalStyles.backdrop}
        onClick={() => !loading && onClose && onClose()}
      />

      <div className={aiInvoiceModalStyles.modal}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className={aiInvoiceModalStyles.title}>
              <GeminiIcon className="w-6 h-6 flex-none" />
              Create Invoice in AI
            </h3>
            <p className={aiInvoiceModalStyles.description}>
              Paste any text that contains invoice details
            </p>
          </div>

          <button
            disabled={loading}
            onClick={() => !loading && onClose && onClose()}
            className={aiInvoiceModalStyles.closeButton}
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <label className={aiInvoiceModalStyles.label}>
            Paste invoice text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className={aiInvoiceModalStyles.textarea}
            placeholder='e.g. Logo design for "Greenvibe" at $120'
            disabled={loading}
          />
        </div>

        {error && (
          <div className={aiInvoiceModalStyles.error}>
            {error.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}

            {/quota|rate|busy|exhausted/i.test(error) && (
              <div className="mt-2 text-sm text-gray-600">
                AI is busy. Please wait 1 minute and try again.
              </div>
            )}
          </div>
        )}

        <div className={aiInvoiceModalStyles.actions}>
          <AnimatedButton
            onClick={handleGenerateClick}
            isLoading={loading}
            disabled={loading}
            label={loading ? "Generating..." : "Generate"}
          />
        </div>
      </div>
    </div>
  )
}

export default AiInvoiceModel
