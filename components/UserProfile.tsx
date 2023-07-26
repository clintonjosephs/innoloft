import React from 'react'
import Image from 'next/image';
import User from '../models/User';

const UserProfile: React.FC<{user: User, company_name: string}> = ({user, company_name}) => {
  return (
    <div className="flex flex-row items-center">
        <Image
          src={user.profilePicture}
          width={50}
          height={50}
          alt="profile_image"
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          className="mr-4"
        />
        <div className="flex flex-col text-gray-700">
          <span className="text-sm font-extrabold">{user.firstName} {user.lastName}</span>
          <span className="text-xs">{company_name} </span>
        </div>
      </div>
  )
}

export default UserProfile