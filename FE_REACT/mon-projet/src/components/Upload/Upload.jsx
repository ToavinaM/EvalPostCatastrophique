import React from 'react';
import './Upload.scss'
import Map from '../Map/Map';
import { Button, Segmented } from 'antd';
import UploadFile from '../UploadFile/UploadFile';
export default function Upload() {
  return (
    <div className='container-upload'>
      
      <div className='container-upload1-left'>
        <div className='child-top'>
          <Segmented options={["Analyse", "Liste", 'longtext-longtext-longtext-longtext']} block />
        </div>

        <div className='child-bottom'>
          <div className='container-uploadFile'>
            <UploadFile></UploadFile>
            
            <div className='container-button'>

              <Button color="primary" variant="solid">
                Solid
              </Button>
            </div>
          </div>
        </div>

      </div>  
      <div className='container-upload1-right'>
        <Map></Map>
      </div>


    </div>
  );
}
