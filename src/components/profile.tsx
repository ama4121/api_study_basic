import { useEffect, useState } from 'react';
import Modal from './modal';

export default function Profile() {
  interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }
  interface ProfileApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Profile[];
  }

  const [profile, setProfile] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((data: ProfileApiResponse) => {
        setProfile(data.data);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  const openModal = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };
  const sendEmail = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    const user = profile.find((p) => p.id === id);
    if (user) {
      window.location.href = `mailto:${user.email}`;
    } else {
      console.error('User not found');
    }
  };

  return (
    <>
      <div className="pagination">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}>
              {p}
            </button>
          ))}
      </div>
      <div className="profile-list">
        {profile.map((user) => (
          <div className="profile" key={user.id}>
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <b className="name">
              {user.first_name} {user.last_name}
            </b>
            <button type="button" onClick={(e) => openModal(user)}>
              show detail
            </button>
          </div>
        ))}
      </div>

      {/* 모달 사용 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedProfile && (
          <div className="profile vertical">
            <b className="name">
              {selectedProfile.first_name} {selectedProfile.last_name}
            </b>
            <img src={selectedProfile.avatar} alt={selectedProfile.first_name} />
            <div className="email">
              {selectedProfile.email}
              <button
                type="button"
                className="email"
                onClick={(e) => sendEmail(e, selectedProfile.id)}>
                send email
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
