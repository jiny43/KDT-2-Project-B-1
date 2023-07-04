import React, {useState, useEffect} from 'react';
import {ParkingChooseModal} from './ParkingChooseModal';
import {ParkingList} from './ParkingList';

export const ParkingModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // 주차장검색할건지 선택하는 모달에서 받아온 값으로 다음 모달 띄우기위한 함수
  const modalChange = (next: boolean) => {
    setShowModal(next);
  };

  // showModal이 true 일 경우, 주차장 검색할 건지 물어보는 모달
  if (showModal === true) {
    console.log('주차장갈거야?', showModal);

    // 모달창을 통해 false 받아오기
    return <ParkingChooseModal modalState={modalChange} />;
  }
  // showModal이 false되면 인근 주차장 목록 모달 띄우기.
  else if (showModal === false) {
    console.log('주차장목록보이니', showModal);
    return <ParkingList />;
  }

  return null;
};
