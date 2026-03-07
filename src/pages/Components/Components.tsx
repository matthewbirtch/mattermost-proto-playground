import Button from '@/components/ui/Button/Button'
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
    <div className={styles.components}>
      <header className={styles['components__header']}>
        <h1 className={styles['components__heading']}>Components</h1>
        <p className={styles['components__subheading']}>
          Use this page to add and test component instances. Copy any block below
          to try different props or add new components.
        </p>
      </header>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Button</h2>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Primary</span>
            <Button>Primary</Button>
            <Button leadingIcon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}>
              With leading icon
            </Button>
            <Button trailingIcon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}>
              With trailing icon
            </Button>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Secondary</span>
            <Button emphasis="Secondary">Secondary</Button>
            <Button emphasis="Tertiary">Tertiary</Button>
            <Button emphasis="Quaternary">Quaternary</Button>
            <Button emphasis="Link">Link</Button>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <Button size="X-Small">X-Small</Button>
            <Button size="Small">Small</Button>
            <Button size="Medium">Medium</Button>
            <Button size="Large">Large</Button>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Destructive</span>
            <Button destructive>Delete</Button>
            <Button destructive emphasis="Secondary">Cancel</Button>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Disabled</span>
            <Button disabled>Disabled</Button>
            <Button emphasis="Secondary" disabled>Disabled</Button>
          </div>
          <div className={[styles['components__button-row'], styles['components__button-row--inverted-bg']].join(' ')}>
            <span className={styles['components__instance-label']}>Inverted</span>
            <Button appearance="Inverted">Primary</Button>
            <Button appearance="Inverted" emphasis="Secondary">Secondary</Button>
            <Button appearance="Inverted" emphasis="Tertiary">Tertiary</Button>
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Emoji</h2>
        <div className={styles['components__row']}>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>size 16</span>
            <Emoji emoji="👍" size="16" />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>size 24 (default)</span>
            <Emoji emoji="🎉" size="24" />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>size 32</span>
            <Emoji emoji="🚀" size="32" />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>size 40</span>
            <Emoji emoji="✨" size="40" />
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Icon</h2>
        <div className={styles['components__row']}>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>16, Globe</span>
            <Icon glyph={<GlobeIcon size={16} />} size="16" />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>24, default glyph</span>
            <Icon size="24" />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>32, Emoticon</span>
            <Icon
              glyph={<EmoticonHappyOutlineIcon size={32} />}
              size="32"
            />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>40, Globe</span>
            <Icon glyph={<GlobeIcon size={40} />} size="40" />
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Illustration</h2>
        <div className={styles['components__row']}>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>AI Copilot (default size)</span>
            <Illustration aria-label="AI Copilot intro">
              <AICopilotIllustration />
            </Illustration>
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>Search, 200px width</span>
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
