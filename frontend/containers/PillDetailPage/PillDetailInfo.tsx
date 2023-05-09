import React from 'react';
import { useState, useEffect } from 'react';
import PillDetailBadge from './PillDetailBadge';
import PillDetailImg from './PillDetailImg';
import PillDetailContents from './PillDetailContents';
import PillDetailNutrientGage from './PillDetailNutrientGage';
import { CircleFill } from '@emotion-icons/bootstrap/CircleFill';
import styled from '@emotion/styled';

type Props = {};

type nutrient = {
  name: string;
  amount: number;
};

const CircleFillComponent = styled(CircleFill)``;

function PillDetailInfo({}: Props) {
  const [nutrientList, setNutrientList] = useState<Array<nutrient>>(
    [],
  );
  const [certification, setCertification] = useState<Array<string>>(
    [],
  );
  const [functionality, setFunctionality] = useState<Array<string>>(
    [],
  );
  const [pillType, setPillType] = useState<number>(0);
  const [caution, setCaution] = useState<string>('');
  const [how, setHow] = useState<string>('');
  const [material, setMaterial] = useState<Array<string>>([]);
  const Items = {
    data: [
      {
        certification: ['haccp', 'GMP'],
        functionality: ['눈건강', '관절건강'],
        pillType: 4,
        nutrients: [
          { name: '비타민A', amount: 40 },
          { name: '비타민B', amount: 20 },
          { name: '비타민C', amount: 50 },
          { name: '비타민D', amount: 10 },
        ],
        caution:
          '너무 맛있으니까 조심해야됩니다 카페인이랑 같이먹으면 안됨 ㄴㄴ절대',
        how: '1일 1회 충분한 물과 함께 복용',
        material: ['국산', '독일산'],
      },
    ],
  };

  useEffect(() => {
    setNutrientList(Items.data[0].nutrients);
    setCertification(Items.data[0].certification);
    setFunctionality(Items.data[0].functionality);
    setPillType(Items.data[0].pillType);
    setCaution(Items.data[0].caution);
    setHow(Items.data[0].how);
    setMaterial(Items.data[0].material);
  }, []);

  return (
    <div>
      <PillDetailBadge subject="인증정보" badges={certification} />
      <PillDetailBadge subject="기능성" badges={functionality} />
      <PillDetailImg subject="제형" pillType={pillType} />

      <div className="bg-white min-h-[60px] px-5 py-30 grid grid-cols-6 rounded-lg mt-3">
        <div className="col-span-1 grid content-center">영양성분</div>
        <div className="col-span-5 mt-5">
          <div className=" flex flex-row-reverse">
            <div className="flex mx-1">
              <CircleFillComponent className="text-red-400 w-3 mr-1" />
              <div>과다</div>
            </div>
            <div className="flex mx-1">
              <CircleFillComponent className="text-[#79D096] w-3 mr-1" />
              <div>적정</div>
            </div>
            <div className="flex mx-1">
              <CircleFillComponent className="text-yellow-400 w-3 mr-1" />
              <div>부족</div>
            </div>
          </div>
          <div className="grid content-center mb-3 pl-2">
            {nutrientList.map((nutrient, idx) => (
              <PillDetailNutrientGage
                key={idx}
                nuName={nutrient.name}
                amount={nutrient.amount}
              />
            ))}
          </div>
        </div>
      </div>

      <PillDetailContents subject="섭취 방법" content={how} />
      <PillDetailContents
        subject="섭취 시 주의사항"
        content={caution}
      />
      <PillDetailBadge subject="원료" badges={material} />
    </div>
  );
}

export default PillDetailInfo;
