import { useState } from "react";
import { Modal } from "../ui/modal";

const BadgesList = () => {
  const badges = [
    {
      title: "سليل الكلمة",
      description:
        "كاتب تفيض كلماته من عمق الإلهام، يحمل سلالة الحروف في قلبه.",
    },
    {
      title: "نعم أنا هنا",
      description: "إشارة إلى الحضور الدائم والمشاركة المستمرة في عالم السرد.",
    },
    {
      title: "سيد السرد",
      description: "يمتلك مهارة حبك الأحداث وصياغة القصص بطريقة تأسر القارئ.",
    },
    {
      title: "أسطورة السرد",
      description:
        "وصل إلى مرحلة يتحدث عنه فيها الجميع، قصصه تُروى كما تُروى الأساطير.",
    },
    {
      title: "نصل الكلمة",
      description:
        "مزيج من القوة والإبداع؛ فارس يكتب كما يقاتل، بالكلمة كسلاح.",
    },
  ];

  const [selectedBadge, setSelectedBadge] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectBadge = (badge, idx) => {
    const selected = { ...badge, image: `/badge-${idx + 1}.png` };
    setSelectedBadge(selected);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-zinc-800 flex items-center justify-between flex-wrap p-3">
      {badges.map((badge, idx) => (
        <div
          className="flex flex-col gap-3 items-center text-zinc-100 cursor-pointer"
          onClick={() => handleSelectBadge(badge, idx)}
        >
          <img src={`/badge-${idx + 1}.png`} className="w-36" />
          <p>{badge.title}</p>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBadge(null);
        }}
      >
        <div className="flex flex-col gap-3 items-center justify-center text-zinc-100 cursor-pointer">
          <img src={selectedBadge?.image} className="w-36" />
          <p>{selectedBadge?.description}</p>
        </div>
      </Modal>
    </div>
  );
};

export default BadgesList;
