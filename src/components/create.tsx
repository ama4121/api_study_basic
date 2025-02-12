import { createProfile } from 'api/profile';
import { useState } from 'react';
import Modal from './modal';
export default function CreateForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdProfile, setCreatedProfile] = useState<{ name: string; email: string } | null>(
    null
  );

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCreateProfile = () => {
    createProfile(name, email)
      .then((response: { name: string; email: string }) => {
        setCreatedProfile(response);
        setIsModalOpen(true);
        setName('');
        setEmail('');
      })
      .catch((error: unknown) => {
        console.error('Failed to create profile:', error);
        alert('프로필 생성에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className="create-form">
      <h2 className="title">프로필 생성</h2>
      <input type="text" placeholder="Name" value={name} onChange={handleChangeName} />
      <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
      <button type="button" onClick={handleCreateProfile}>
        프로필 생성
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="profile-create-modal">
        <h1>프로필 생성이 완료 되었습니다.</h1>
        <p>이름 : {createdProfile?.name}</p>
        <p>이메일 : {createdProfile?.email}</p>
      </Modal>
    </div>
  );
}
