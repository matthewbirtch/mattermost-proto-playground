import styles from './LabelTag.module.scss';

type LabelTagProps = {
  label: string;
};

export default function LabelTag({ label }: LabelTagProps) {
  return <span className={styles['label-tag']}>{label}</span>;
}
