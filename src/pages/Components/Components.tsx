import Emoji from '@/components/ui/Emoji/Emoji'
import Icon from '@/components/ui/Icon/Icon'
import Illustration from '@/components/ui/Illustration/Illustration'
import GlobeIcon from '@mattermost/compass-icons/components/globe'
import EmoticonHappyOutlineIcon from '@mattermost/compass-icons/components/emoticon-happy-outline'
import AICopilotIllustration from '@/assets/illustrations/ai-copilot-intro.svg?react'
import SearchIllustration from '@/assets/illustrations/search.svg?react'
import styles from './Components.module.scss'

/**
 * Component showcase page. Add or duplicate instances below to test components
 * with different props (sizes, variants, etc.).
 */
export default function Components() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Components</h1>
        <p className={styles.subheading}>
          Use this page to add and test component instances. Copy any block below
          to try different props or add new components.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Emoji</h2>
        <div className={styles.row}>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>size 16</span>
            <Emoji emoji="👍" size="16" />
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>size 24 (default)</span>
            <Emoji emoji="🎉" size="24" />
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>size 32</span>
            <Emoji emoji="🚀" size="32" />
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>size 40</span>
            <Emoji emoji="✨" size="40" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Icon</h2>
        <div className={styles.row}>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>16, Globe</span>
            <Icon glyph={<GlobeIcon size={16} />} size="16" />
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>24, default glyph</span>
            <Icon size="24" />
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>32, Emoticon</span>
            <Icon
              glyph={<EmoticonHappyOutlineIcon size={32} />}
              size="32"
            />
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>40, Globe</span>
            <Icon glyph={<GlobeIcon size={40} />} size="40" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Illustration</h2>
        <div className={styles.row}>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>AI Copilot (default size)</span>
            <Illustration aria-label="AI Copilot intro">
              <AICopilotIllustration />
            </Illustration>
          </div>
          <div className={styles.instance}>
            <span className={styles.instanceLabel}>Search, 200px width</span>
            <Illustration
              aria-label="Search"
              width="200px"
              height="120px"
            >
              <SearchIllustration />
            </Illustration>
          </div>
        </div>
      </section>
    </div>
  )
}
