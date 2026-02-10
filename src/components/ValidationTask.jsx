import React, { useState } from 'react'

/**
 * ValidationTask - UI for a single validation task (paste-output type).
 * Validates user output against task.expectedPatterns via regex.
 */
function ValidationTask({ task, taskNumber }) {
  const [userOutput, setUserOutput] = useState('')
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [showHints, setShowHints] = useState(false)
  const [hasValidated, setHasValidated] = useState(false)
  const isPasteOutput = task.type === 'paste-output'

  const handleCheck = () => {
    setHasValidated(true)
    setShowHints(false)

    if (!isPasteOutput || !userOutput.trim()) {
      setStatus('error')
      return
    }

    const patterns = task.expectedPatterns || []
    const matched = patterns.some((pattern) => {
      try {
        const re = new RegExp(pattern)
        return re.test(userOutput)
      } catch {
        return false
      }
    })

    if (matched) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="validation-task-card">
      <div className="validation-task-number">{taskNumber}</div>
      <div className="validation-task-content">
        <p className="validation-task-description">{task.description}</p>

        {isPasteOutput && (
          <textarea
            className="validation-task-textarea"
            value={userOutput}
            onChange={(e) => setUserOutput(e.target.value)}
            placeholder="Paste your command output here..."
            rows={5}
            aria-label={`Output for task: ${task.description}`}
          />
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCheck}
        >
          Check My Work
        </button>

        {hasValidated && (
          <div className="validation-feedback">
            {status === 'success' && (
              <p className="validation-success">Great job! ✓</p>
            )}
            {status === 'error' && (
              <>
                <p className="validation-error">Not quite right. Try again?</p>
                {task.hints?.length > 0 && (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowHints((prev) => !prev)}
                    >
                      {showHints ? 'Hide Hints' : 'Show Hints'}
                    </button>
                    {showHints && (
                      <ul className="validation-hints">
                        {task.hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ValidationTask
