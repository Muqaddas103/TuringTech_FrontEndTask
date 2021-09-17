import React from 'react';
import CallListItem from './CallListItem';

function CallList(props) {
    return (
<div className="grid">
        {props.callslist.map((item) => (
            <CallListItem
              key={item.id}
              id={item.id}
              duration={item.duration}
              is_archived={item.is_archived}
              from={item.from}
              to={item.to}
              direction={item.direction}
              call_type={item.call_type}
              via={item.via}
              created_at={item.created_at}
              getCalls={props.getCalls}
              callslist={props.callslist}
            />
          ))}
</div>
    );
};

export default CallList;