import React, {useState, useEffect} from 'react';
import {ParkingChooseModal} from './parkingModal';
import {ParkingList} from './ParkingList';

export const ModalComponent = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const modalChange = (next: boolean) => {
    setShowModal(next);
  };

  if (showModal === true) {
    console.log('주차장갈거야?', showModal);
    return <ParkingChooseModal modalState={modalChange} />;
  } else if (showModal === false) {
    console.log('주차장목록보이니', showModal);
    return <ParkingList />;
  }
};
