import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';

const ItemList = (props: { itemList: Array<Item> }) => {
  // const itemDataList = props.data;
  const router = useRouter();

  const id = useUserStore.getState().user?.id as number;

  // console.log(props.itemList);
  // const handleInterest = (itemId: number): void => {
  //   if (window.confirm('관심 영양제로 추가하시겠습니까?')) {
  //     try {
  //       api.addInterestPill(id, itemId);
  //       router.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const removeInterest = (itemId: number): void => {
  //   if (window.confirm('관심 영양제 목록에서 제거하시겠습니까?')) {
  //     try {
  //       api.deleteInterestPill(id, itemId);
  //       router.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <div className="grid grid-cols-2 space-y-2 gap-4 w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md items-baseline px-8">
      {props.itemList?.map((item, index) => (
        <div className="indicator">
          <div
            id="item"
            className="flex flex-col items-center w-[160px] my-4 min-h-28"
            key={index}
            style={{ cursor: 'pointer' }}
          >
            {/* //   {item.isInterested ? (
          //     <div className="text-red-500 bg-opacity-0 border-none indicator-item badge top-2 right-8">
          //       <button
          //         onClick={() => removeInterest(item.nutrientId)}
          //       >
          //         <FavoriteIcon />
          //       </button>
          //     </div>
          //   ) : (
          //     <div className="text-red-500 bg-opacity-0 border-none indicator-item badge top-2 right-8">
          //       <button
          //         onClick={() => handleInterest(item.nutrientId)}
          //       >
          //         <FavoriteBorderIcon />
          //       </button>
          //     </div>
          //   )}
          //   <div className="text-[#90B5EA] border-none bg-opacity-0 indicator-item badge top-2 right-2">
          //     <button>
          //       <AddCircleOutlineRoundedIcon />
          //     </button>
          //   </div> */}
            <div id="item-img" className="mask mask-square">
              <Image
                src={item.nutrientImageUrl}
                alt="item-img"
                width={100}
                height={100}
                onClick={() =>
                  router.push(
                    `/pilldetail/pill-detail/${item.nutrientId}`,
                  )
                }
              />
            </div>
            <div
              id="item-info"
              className="flex flex-col items-center"
            >
              <span
                id="manufacturer"
                className="text-xs font-bold text-[#909090]"
              >
                {item.nutrientBrand}
              </span>
              <span
                id="name"
                className="text-sm font-extrabold text-[#3A3A3A]"
              >
                {item.nutrientName}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;