import React, { useEffect, useMemo, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { NewParticipant } from './new-participant/new-participant';

import './participants.scss';

export const Participants = ({ name, onNameChange, participants, showForm }) => {
  const titleRef = useRef();
  const formRef = useRef();

  const fields = useMemo(() => [], [participants]);

  useEffect(() => {
    const calculatePositions = () => {
      if (fields.length === 0) {
        return;
      }

      let maxHeight = 0;
      fields.forEach(item => {
        if (item != null && item.offsetHeight > maxHeight) {
          maxHeight = item.offsetHeight;
        }
      });

      let offset = 8;
      if (formRef.current) {
        offset = formRef.current.offsetHeight / 4;
      }

      let top = maxHeight + offset;

      if (titleRef.current) {
        titleRef.current.style.top = top + 'px';
      }

      if (formRef.current) {
        formRef.current.style.top = top + 'px';
      }
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    return () => {
      window.removeEventListener('resize', calculatePositions);
    }
  }, [participants, fields.length]);

  return (
    <tr className="participants">
      <th scope="col" className="title" ref={titleRef}>
        {showForm && <FormattedMessage id="participants.participants" />}
      </th>
      {showForm && (
        <th scope="col" className="attendance" ref={formRef}>
          <NewParticipant name={name} onNameChange={onNameChange} />
        </th>
      )}
      {participants.map((participant) =>
        <th key={participant} ref={input => fields.push(input)} scope="col">
          <span className="participant"><span>{participant}</span></span>
        </th>
      )}
      {participants.length === 0 && <th className="empty" />}
    </tr>
  );
};
