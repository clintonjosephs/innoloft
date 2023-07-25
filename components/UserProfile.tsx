import React from 'react'
import Image from 'next/image';

const UserProfile = () => {
  return (
    <div className="flex flex-row items-center">
        <Image
          src="/assets/images/profile_image.png"
          width={50}
          height={50}
          alt="profile_image"
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          className="mr-4"
        />
        <div className="flex flex-col text-gray-700">
          <span className="text-sm font-extrabold">John Doe</span>
          <span className="text-xs">Innoloft GmbH </span>
        </div>
      </div>
  )
}

export default UserProfile