import React, { useState } from 'react'

/**
 * ValidationTask - UI for inline validation tasks.
 *
 * Supported task types:
 *   - "paste-output": Student pastes terminal output, validated against regex patterns.
 *   - "command-match": Student types a command, validated against acceptable answers.
 *
 * Frontmatter examples:
 *
 *   { "type": "paste-output", "expectedPatterns": ["Homebrew \\d+"], ... }
 *   { "type": "command-match", "acceptableAnswers": ["cd ..", "cd.."], ... }
 */
function ValidationTask({ task, taskNumber, isCompleted, onComplete }) {
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState(isCompleted ? 'success' : null)
  const [showHints, setShowHints] = useState(false)
  const [hasValidated, setHasValidated] = useState(isCompleted)

  const isPasteOutput = task.type === 'paste-output'
  const isCommandMatch = task.type === 'command-match'
  const hasInput = isPasteOutput || isCommandMatch

  const handleCheck = () => {
    setHasValidated(true)
    setShowHints(false)

    if (!hasInput || !userInput.trim()) {
      setStatus('error')
      return
    }

    let matched = false

    if (isPasteOutput) {
      // Validate against regex patterns
      const patterns = task.expectedPatterns || []
      matched = patterns.some((pattern) => {
        try {
          const re = new RegExp(pattern)
          return re.test(userInput)
        } catch {
          return false
        }
      })
    } else if (isCommandMatch) {
      // Normalize and compare against acceptable answers
      const normalized = userInput.trim().replace(/\s+/g, ' ').toLowerCase()
      const answers = task.acceptableAnswers || []
      matched = answers.some((answer) => {
        return normalized === answer.trim().replace(/\s+/g, ' ').toLowerCase()
      })
    }

    if (matched) {
      setStatus('success')
      if (onComplete) {
        onComplete(task.id)
      }
    } else {
      setStatus('error')
    }
  }

  return (
    <div className={`validation-task-card ${isCompleted ? 'validation-task-completed' : ''}`}>
      <div className={`validation-task-number ${isCompleted ? 'validation-task-number-completed' : ''}`}>
        {isCompleted ? '✓' : taskNumber}
      </div>
      <div className="validation-task-content">
        <p className="validation-task-description">{task.description}</p>

        {isPasteOutput && (
          <textarea
            className="validation-task-textarea"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Paste your command output here..."
            rows={5}
            aria-label={`Output for task: ${task.description}`}
          />
        )}

        {isCommandMatch && (
          <input
            type="text"
            className="validation-task-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCheck()
            }}
            placeholder="Type your command here..."
            aria-label={`Command for task: ${task.description}`}
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
