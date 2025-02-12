import { useEffect, useState } from 'react';
import Modal from './modal';
import { getProfileList } from 'api/profile';
import { ProfileDetail } from 'type/profile';

export default function Profile() {
  const [profile, setProfile] = useState<ProfileDetail[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedProfile, setSelectedProfile] = useState<ProfileDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProfileList(page)
      .then((data) => {
        setProfile(data.data);
        setTotalPages(data.total_pages);
        setPerPage(data.per_page);
      })
      .catch((error) => console.error('Error fetching profile list:', error));
  }, [page]);

  const openModal = (profile: ProfileDetail) => {
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

  const handleList = (id: number, ref: 'prev' | 'next') => {
    if (ref === 'prev') {
      if (id > 1) {
        const prevProfile = profile.find((p) => p.id === id - 1) || null;
        setSelectedProfile(prevProfile);
      }
      if (id % perPage === 1 && page > 1) {
        setPage((prev) => prev - 1);
      }
    } else if (ref === 'next') {
      if (profile.find((p) => p.id === id + 1)) {
        const nextProfile = profile.find((p) => p.id === id + 1) || null;
        setSelectedProfile(nextProfile);
      } else if (id % perPage === 0 && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (profile.length > 0) {
      setSelectedProfile(page > 1 ? profile[0] : profile[profile.length - 1]);
    }
  }, [profile, page]);

  return (
    <>
      <div className="pagination">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)} className={page === p ? 'active' : ''}>
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="profile-detail-modal">
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
            <div className="control-btn">
              {selectedProfile.id !== 1 && (
                <button type="button" onClick={() => handleList(selectedProfile?.id ?? 0, 'prev')}>
                  이전
                </button>
              )}
              {selectedProfile.id !== totalPages * perPage && (
                <button type="button" onClick={() => handleList(selectedProfile?.id ?? 0, 'next')}>
                  다음
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
