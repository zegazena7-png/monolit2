'use client'

import styles from './BlueprintToggle.module.css'

interface BlueprintToggleProps {
  mode: 'photo' | 'blueprint'
  onChange: (mode: 'photo' | 'blueprint') => void
}

export default function BlueprintToggle({ mode, onChange }: BlueprintToggleProps) {
  return (
    <div className={styles.toggle}>
      <button
        className={`${styles.option} ${mode === 'photo' ? styles.active : ''}`}
        onClick={() => onChange('photo')}
        aria-pressed={mode === 'photo'}
      >
        Photo
      </button>
      <span className={styles.separator} aria-hidden="true" />
      <button
        className={`${styles.option} ${mode === 'blueprint' ? styles.active : ''}`}
        onClick={() => onChange('blueprint')}
        aria-pressed={mode === 'blueprint'}
      >
        Blueprint
      </button>
    </div>
  )
}
