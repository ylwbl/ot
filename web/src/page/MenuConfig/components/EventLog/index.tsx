import React, { Component } from 'react';
import { DotOutlined, DotFilled } from '@el-components/el-icons';
import './style.less';

interface Log {
  time: string;
  action: string;
  username:  string;
}
class EventLog extends Component {
  formatLog = (logs: Array<Log>) => {
    return logs.map(v => {
      return <>{`${v.time}: `}<br/></>
    })
  }
  render() {
    return (
      <div className='eventlog-container'>
        <pre>
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/>
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/> 
          2021-11-25 14:53:35: admin change the config<br/>
        </pre>
      </div>
    );
  }
}
export default EventLog;
