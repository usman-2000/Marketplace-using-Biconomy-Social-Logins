import { useState, useEffect } from "react";
import React from "react";
import styleNftShowcase from "./TopNfts.module.css";
import axios from "axios";
// import nftImage from "../utilities/nftImage.png";

const NFTShowcaseList = () => {
  const [data, setData] = useState([]);
  async function fetchData() {
    try {
      await axios.get("http://localhost:5004/nfts/getallnfts").then((res) => {
        console.log("Res", res.data);
        setData(res.data);
      });
    } catch (error) {
      console.log({ error });
    }
  }
  // console.log(data[0]);
  // fetchData();
  useEffect(() => {
    console.log("check", data);
    if (data.length === 0) {
      // console.log("check");
      fetchData();
    }
  }, [data]);
  return (
    <div className={styleNftShowcase.nftshowcase_cont}>
      <h1>Top Nfts</h1>
      <div
        className={`w-[100%] flex flex-row flex-wrap justify-center ${styleNftShowcase.nft_card_cont}`}
      >
        {data.map((e, i) => {
          return (
            <>
              <div
                key={i}
                className={`!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined m-2 ${styleNftShowcase.nft_card}`}
              >
                <div className="h-full w-full">
                  <div className="relative h-[210px] w-full">
                    <img
                      src={e.ipfsHash}
                      className="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full "
                      alt=""
                    />
                  </div>
                  <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                    <div className="mb-2">
                      <p className="text-lg font-bold text-navy-700 mt-1 text-sm font-medium text-red-600 md:mt-2">
                        {e.title}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
                        {e.ownerAddress.slice(0, 16)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:items-center lg:justify-between ">
                    <div className="flex">
                      <p className="!mb-0 text-sm font-bold text-gray-900">
                        Current Bid: {e.price} <span>ETH</span>
                      </p>
                    </div>
                    {e.active ? (
                      <button className="linear rounded-[20px] bg-green-700 px-4 py-2 text-base font-medium text-white transition duration-200  active:bg-brand-700">
                        Live
                      </button>
                    ) : (
                      ""
                    )}
                    {/* <Link to={`/${e._id}`}> */}
                    <button className="linear rounded-[20px] bg-blue-700 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-yellow-700 active:bg-blue-700">
                      Details
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default NFTShowcaseList;
