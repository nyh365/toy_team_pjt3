import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { makeCombinationStore } from '../../store/makeCombinationStore';
import { likeStore } from '../../store/likeStore';
import { useDeleteInterest } from '@/apis/hooks';

type interest = {
  interestNutrientId: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

type Props = {
  nutrient: interest;
};

function PillAnalysisLike(props: Props) {
  const { combList, addSelected, removeSelected, resetCombList } =
    makeCombinationStore();
  const { removeLike } = likeStore();
  const userData = JSON.parse('userData' || '{}');
  const userId: number = userData?.id as number;

  //이 영양제가 선택되었는지 여부를 저장
  const [isSelected, setIsSelected] = useState<boolean>(false);

  //영양제 조합 삭제API 연결해서 조합 삭제
  const deleteLike = (event: React.MouseEvent) => {
    const { isLoading, data, isError, isSuccess, error } =
      useDeleteInterest(userId, props.nutrient.nutrientId);

    if (isSelected) {
      //이미 선택되어있는 상태였다면 x를 눌러 삭제했을 때에도 seledtedList에서 제거해줘야 함
      removeSelected(props.nutrient.nutrientId);
      removeLike(props.nutrient.nutrientId);
    }
    //api 연결
    if (isError) {
      console.log(error);
    }

    //stopPropagation()=> 이벤트 버블링(이벤트 발생 위치부터 상위로 이동)을 막아줌
    //x를 클릭했을 때, selected css 상태 변하지 않게
    event.stopPropagation();
  };

  //영양제 선택하면 css 변경 및 선택 영양제 리스트에 id제공여부 결정하는 함수
  const selectThis = (event: React.MouseEvent) => {
    if (isSelected) {
      removeSelected(props.nutrient.nutrientId);
      // console.log(combList);
    } else {
      addSelected(props.nutrient.nutrientId);
    }
    setIsSelected(!isSelected);
  };

  return (
    <div className="" onClick={selectThis}>
      <div
        className={`${
          isSelected ? 'bg-[#90B5EA]' : 'bg-[#D8EDFF]'
        } w-32 h-32 rounded-lg mx-auto grid content-center`}
      >
        <div className="mx-auto bg-white rounded-lg w-28 h-28">
          <div className="grid justify-items-end">
            <button
              className="absolute w-5 h-5 mt-1 mr-1 text-gray-500"
              onClick={deleteLike}
            >
              ✕
            </button>
          </div>
          <div className="relative w-16 h-16 mx-auto">
            <Image
              className="w-full h-full"
              src={props.nutrient.nutrientImageUrl}
              alt="사진깨짐"
            />
          </div>
          <div className="text-xs leading-3 text-center text-gray-400">
            {props.nutrient.nutrientBrand}
          </div>
          {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
          <div className="leading-4 text-center line-clamp-2">
            {props.nutrient.nutrientName}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisLike;