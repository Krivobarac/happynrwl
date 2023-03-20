import styles from './rct-simple-lib.module.scss';

/* eslint-disable-next-line */
export interface RctSimpleLibProps {}

export function RctSimpleLib(props: RctSimpleLibProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to RctSimpleLib!</h1>
    </div>
  );
}

export default RctSimpleLib;
