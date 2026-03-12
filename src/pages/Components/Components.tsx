import UserAvatar from '@/components/ui/UserAvatar/UserAvatar'
import Button from '@/components/ui/Button/Button'
import Checkbox from '@/components/ui/Checkbox/Checkbox'
import Radio from '@/components/ui/Radio/Radio'
import Switch from '@/components/ui/Switch/Switch'
import StatusBadge from '@/components/ui/StatusBadge/StatusBadge'
import Emoji from '@/components/ui/Emoji/Emoji'
import Icon from '@/components/ui/Icon/Icon'
import IconButton, { ICON_BUTTON_ICON_SIZES } from '@/components/ui/IconButton/IconButton'
import TextInput from '@/components/ui/TextInput/TextInput'
import Illustration from '@/components/ui/Illustration/Illustration'
import GlobeIcon from '@mattermost/compass-icons/components/globe'
import EmoticonHappyOutlineIcon from '@mattermost/compass-icons/components/emoticon-happy-outline'
import AICopilotIllustration from '@/assets/illustrations/ai-copilot-intro.svg?react'
import SearchIllustration from '@/assets/illustrations/search.svg?react'
import avatarLeonard from '@/assets/avatars/Leonard Riley.png'
import avatarDanielle from '@/assets/avatars/Danielle Okoro.png'
import avatarMarco from '@/assets/avatars/Marco Rinaldi.png'
import avatarEmma from '@/assets/avatars/Emma Novak.png'
import avatarSofia from '@/assets/avatars/Sofia Bauer.png'
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
        <h2 className={styles['components__section-title']}>Checkbox</h2>
        <p className={styles['components__subheading']} style={{ marginBottom: 'var(--spacing-m)' }}>
          Native HTML checkbox with Figma Checkbox (Checkbox Selector) v2.0.2 styles. Supports checked, unchecked, and indeterminate.
        </p>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>States</span>
            <Checkbox size="Medium">Unchecked</Checkbox>
            <Checkbox size="Medium" defaultChecked>Checked</Checkbox>
            <Checkbox size="Medium" indeterminate>Indeterminate</Checkbox>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <Checkbox size="Small">Small</Checkbox>
            <Checkbox size="Medium" defaultChecked>Medium</Checkbox>
            <Checkbox size="Large" defaultChecked>Large</Checkbox>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Invalid</span>
            <Checkbox size="Medium" valid={false}>Unchecked invalid</Checkbox>
            <Checkbox size="Medium" defaultChecked valid={false}>Checked invalid</Checkbox>
            <Checkbox size="Medium" indeterminate valid={false}>Indeterminate invalid</Checkbox>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Disabled</span>
            <Checkbox size="Medium" disabled>Disabled unchecked</Checkbox>
            <Checkbox size="Medium" defaultChecked disabled>Disabled checked</Checkbox>
            <Checkbox size="Medium" indeterminate disabled>Disabled indeterminate</Checkbox>
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Radio</h2>
        <p className={styles['components__subheading']} style={{ marginBottom: 'var(--spacing-m)' }}>
          Native HTML radio with Figma Radio v2.0.0 styles. Use the same <code>name</code> to group options.
        </p>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Group</span>
            <Radio name="demo-size" value="a" size="Medium">Option A</Radio>
            <Radio name="demo-size" value="b" defaultChecked size="Medium">Option B</Radio>
            <Radio name="demo-size" value="c" size="Medium">Option C</Radio>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <Radio name="demo-sizes" value="s" size="Small">Small</Radio>
            <Radio name="demo-sizes" value="m" defaultChecked size="Medium">Medium</Radio>
            <Radio name="demo-sizes" value="l" size="Large">Large</Radio>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Invalid</span>
            <Radio name="demo-invalid" value="u" valid={false} size="Medium">Unchecked invalid</Radio>
            <Radio name="demo-invalid" value="c" defaultChecked valid={false} size="Medium">Checked invalid</Radio>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Disabled</span>
            <Radio name="demo-disabled" value="u" disabled size="Medium">Disabled unchecked</Radio>
            <Radio name="demo-disabled" value="c" defaultChecked disabled size="Medium">Disabled checked</Radio>
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Switch</h2>
        <p className={styles['components__subheading']} style={{ marginBottom: 'var(--spacing-m)' }}>
          Native HTML checkbox with <code>role="switch"</code> for toggle semantics. Figma Switch v2.0.0 — track + sliding knob; checked = on (right), unchecked = off (left).
        </p>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>States</span>
            <Switch size="Medium">Unchecked</Switch>
            <Switch size="Medium" defaultChecked>Checked</Switch>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <Switch size="Small">Small</Switch>
            <Switch size="Medium" defaultChecked>Medium</Switch>
            <Switch size="Large" defaultChecked>Large</Switch>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>With secondary label</span>
            <Switch size="Medium" secondaryLabel="Optional description text">
              Label
            </Switch>
            <Switch size="Medium" defaultChecked secondaryLabel="Optional description">
              Label
            </Switch>
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Semi-bold & disabled</span>
            <Switch size="Medium" semiBold>Semi-bold label</Switch>
            <Switch size="Medium" disabled>Disabled unchecked</Switch>
            <Switch size="Medium" defaultChecked disabled>Disabled checked</Switch>
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Text Input</h2>
        <p className={styles['components__subheading']} style={{ marginBottom: 'var(--spacing-m)' }}>
          Figma Text Input v2.0.1 (Border=On). Floating label when <code>label</code> is provided: resting when empty/unfocused, floated when focused or has value. Theme variables only.
        </p>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <TextInput size="Small" placeholder="Small" />
            <TextInput size="Medium" placeholder="Medium" />
            <TextInput size="Large" placeholder="Large" />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>With / without label</span>
            <TextInput label="Label" placeholder="Placeholder" />
            <TextInput placeholder="No label" />
            <TextInput label="With value" defaultValue="Some text" />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Leading / trailing icons</span>
            <TextInput
              label="Search"
              placeholder="Search..."
              leadingIcon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}
            />
            <TextInput
              placeholder="Trailing only"
              trailingIcon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}
            />
            <TextInput
              label="Both"
              placeholder="Leading and trailing"
              leadingIcon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}
              trailingIcon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}
            />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Invalid</span>
            <TextInput label="Error" invalid placeholder="Invalid state" />
            <TextInput label="Error with value" invalid defaultValue="Invalid" />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Character counter</span>
            <TextInput
              label="Description"
              placeholder="Enter text..."
              maxLength={100}
              showCharacterCount
            />
            <TextInput
              label="With value"
              defaultValue="Already filled"
              maxLength={50}
              showCharacterCount
            />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Disabled & read-only</span>
            <TextInput label="Disabled" disabled placeholder="Disabled" />
            <TextInput label="Read-only" readOnly defaultValue="Read only value" />
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Icon Button</h2>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Default</span>
            <IconButton
              aria-label="Icon button"
              icon={<Icon glyph={<GlobeIcon size={20} />} size={ICON_BUTTON_ICON_SIZES.Medium} />}
            />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <IconButton
              aria-label="X-Small"
              icon={<Icon glyph={<GlobeIcon size={12} />} size="12" />}
              size="X-Small"
            />
            <IconButton
              aria-label="Small"
              icon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}
              size="Small"
            />
            <IconButton
              aria-label="Medium"
              icon={<Icon glyph={<GlobeIcon size={20} />} size="20" />}
              size="Medium"
            />
            <IconButton
              aria-label="Large"
              icon={<Icon glyph={<GlobeIcon size={24} />} size="24" />}
              size="Large"
            />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Compact, rounded, toggled</span>
            <IconButton
              aria-label="Compact"
              icon={<Icon glyph={<GlobeIcon size={16} />} size="16" />}
              padding="Compact"
              size="Small"
            />
            <IconButton
              aria-label="Rounded"
              icon={<Icon glyph={<GlobeIcon size={20} />} size="20" />}
              rounded
            />
            <IconButton
              aria-label="Toggled"
              icon={<Icon glyph={<GlobeIcon size={20} />} size="20" />}
              toggled
            />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Destructive & disabled</span>
            <IconButton
              aria-label="Destructive"
              destructive
              icon={<Icon glyph={<GlobeIcon size={20} />} size="20" />}
            />
            <IconButton
              aria-label="Disabled"
              disabled
              icon={<Icon glyph={<GlobeIcon size={20} />} size="20" />}
            />
          </div>
          <div className={[styles['components__button-row'], styles['components__button-row--inverted-bg']].join(' ')}>
            <span className={styles['components__instance-label']}>Style = Inverted</span>
            <IconButton
              aria-label="Inverted icon button"
              icon={<Icon glyph={<GlobeIcon size={20} />} size="20" />}
              style="Inverted"
            />
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>Status Badge</h2>
        <p className={styles['components__subheading']} style={{ marginBottom: 'var(--spacing-m)' }}>
          Figma Status Badge v2.0.1 — standalone; also used on UserAvatar when status is on.
        </p>
        <div className={styles['components__button-block']}>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Status</span>
            <StatusBadge status="Online" />
            <StatusBadge status="Away" />
            <StatusBadge status="Do Not Disturb" />
            <StatusBadge status="Offline" />
          </div>
          <div className={styles['components__button-row']}>
            <span className={styles['components__instance-label']}>Sizes</span>
            <StatusBadge size="XX-Small" status="Online" />
            <StatusBadge size="X-Small" status="Online" />
            <StatusBadge size="Small" status="Online" />
            <StatusBadge size="Medium" status="Online" />
            <StatusBadge size="Large" status="Online" />
          </div>
        </div>
      </section>

      <section className={styles['components__section']}>
        <h2 className={styles['components__section-title']}>User Avatar</h2>
        <p className={styles['components__subheading']} style={{ marginBottom: 'var(--spacing-m)' }}>
          User Avatar (Image type only; Fallback and System variants not implemented).
        </p>
        <div className={styles['components__row']}>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>24, no status</span>
            <UserAvatar
              alt="Leonard Riley"
              src={avatarLeonard}
              size="24"
            />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>32</span>
            <UserAvatar
              alt="Danielle Okoro"
              src={avatarDanielle}
              size="32"
            />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>48 (default), status</span>
            <UserAvatar
              alt="Marco Rinaldi"
              src={avatarMarco}
              size="48"
              status
            />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>64</span>
            <UserAvatar
              alt="Emma Novak"
              src={avatarEmma}
              size="64"
            />
          </div>
          <div className={styles['components__instance']}>
            <span className={styles['components__instance-label']}>96, status</span>
            <UserAvatar
              alt="Sofia Bauer"
              src={avatarSofia}
              size="96"
              status
            />
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
