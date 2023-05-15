import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { haveStore } from '@/store/haveStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';

type Ingredient = {
  ingredientId: number;
  ingredientName: string;
  ingredientAmount: string;
};

type have = {
  havingNutrientList: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  nutrientIngredientList: Array<Ingredient>;
};

type Props = {
  nutrient: have;
};

function PillAnalysisHave(props: Props) {
  const data = {
    message: true,
    nutrientList: [
      {
        nutrientId: 6002000845,
        nutrientName: '에스론 우먼 골드',
        nutrientImageUrl:
          'https://shopping-phinf.pstatic.net/main_1266476/12664762425.8.jpg',
        nutrientBrand: '하이리빙',
      },
      {
        nutrientId: 6002000845,
        nutrientName: '에스론 우먼 골드',
        nutrientImageUrl:
          'https://shopping-phinf.pstatic.net/main_1266476/12664762425.8.jpg',
        nutrientBrand: '하이리빙',
      },
      {
        nutrientId: 6002000845,
        nutrientName: '에스론 우먼 골드',
        nutrientImageUrl:
          'https://shopping-phinf.pstatic.net/main_1266476/12664762425.8.jpg',
        nutrientBrand: '하이리빙',
      },
      {
        nutrientId: 6002000845,
        nutrientName: '에스론 우먼 골드',
        nutrientImageUrl:
          'https://shopping-phinf.pstatic.net/main_1266476/12664762425.8.jpg',
        nutrientBrand: '하이리빙',
      },
    ],
  };

  //이 영양제가 선택되었는지 여부를 저장
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const { addSelected, removeSelected } = makeCombinationStore();
  //영양제 선택하면 css 변경 및 선택 영양제 리스트에 id제공여부 결정하는 함수
  const selectThis = (event: React.MouseEvent) => {
    //선택 되어있으면
    if (isSelected) {
      removeSelected(props.nutrient.nutrientId);
    } else {
      addSelected(props.nutrient.nutrientId);
    }

    setIsSelected(!isSelected);
  };
  return (
    <div className="" onClick={selectThis}>
      <div
        className={` ${
          isSelected ? 'bg-[#90B5EA]' : 'bg-[#D8EDFF]'
        } w-32 h-32 rounded-lg mx-auto grid content-center`}
      >
        <div className="mx-auto bg-white rounded-lg w-28 h-28">
          <div className="relative w-16 h-16 mx-auto">
            <Image
              className="w-full h-full"
              src={props.nutrient.nutrientImageUrl}
              alt="사진깨짐"
              width={100}
              height={100}
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

export default PillAnalysisHave;