import {format} from 'date-fns';

import packageJson from '../../../package.json';
import {buildInfo} from './BuildInfo.css';

declare const __BUILD_TIMESTAMP__: number;
const buildTimestamp = __BUILD_TIMESTAMP__;
const BuildInfo = () => {
  const {version} = packageJson;

  return (
    <div className={buildInfo}>
      <b>Uhr lesen</b>{' '}
      <span>
        v{version} ({format(new Date(buildTimestamp), 'dd.MM.yy HH:mm')})
      </span>{' '}
      <a href="https://github.com/xeronimus/my-life" target="_blank" rel="noreferrer noopener">
        <i className="icon icon-github-circled-1" />
      </a>
    </div>
  );
};

export default BuildInfo;
