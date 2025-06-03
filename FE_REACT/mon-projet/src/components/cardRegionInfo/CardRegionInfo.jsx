import React, { useEffect } from 'react';
import './CardRegionInfo.scss';
import { useSelector } from 'react-redux';
import UploadImageRegion from './UploadImageRegion/UploadImageRegion';
export default function CardRegionInfo() {
  const { regionInfo} = useSelector(state => state.map);


    useEffect(() => {
      console.log(regionInfo);
      
    }, [regionInfo])
  


  return (
    <>
      {

        //ici on a enlever la boucle et affiche que le dernier region selectionner
        // regionInfo && regionInfo.map((region, index) => (
          <div className='card-region-info'>
              {regionInfo.length>0 ?
                <>
              <h3>{regionInfo[regionInfo.length - 1]?.address.city || regionInfo[regionInfo.length - 1]?.address.region}</h3>
                  <p><strong>{regionInfo[regionInfo.length-1]?.address.suburb}</strong></p>
                  <p>{regionInfo[regionInfo.length-1  ]?.display_name}</p>
                </>
                :
                <>
                  <h3>Please Select region...</h3>
                </>
              }
          </div>
        // ))
      }
      <hr></hr>
        <UploadImageRegion></UploadImageRegion>
    </>
  );
}
