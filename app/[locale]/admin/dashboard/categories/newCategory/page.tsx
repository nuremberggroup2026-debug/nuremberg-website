import CreateBannerForm from '@/components/categories/NewCategoryForm'
import React from 'react'
import {addCategoryAction} from "../(actions)/addNewCategory"
function page() {
  return (
    <div className='w-full' >
      <CreateBannerForm action={addCategoryAction}/>
    </div>
  )
}

export default page