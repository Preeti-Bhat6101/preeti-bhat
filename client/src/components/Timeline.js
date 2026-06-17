import React from "react";
import {
  FaSchool,
  FaAward,
  FaGraduationCap,
  FaUsers,
  FaTrophy,
  FaChalkboardTeacher,
  FaShieldAlt,
  FaFlagCheckered,
  FaMedal,
} from "react-icons/fa";
import "./Timeline.css";

const milestones = [
  {
    date: "Jun 2016",
    title: "Joined Jawahar Navodaya Vidyalaya",
    description: "Began schooling at JNV.",
    icon: <FaSchool />,
  },
  {
    date: "Mar 2023",
    title: "Selected as Vahani Scholar",
    description:
      "Awarded the Vahani Scholarship, a full scholarship for top applicants nationwide.",
    icon: <FaAward />,
  },
  {
    date: "Oct 2023",
    title: "Joined UVCE",
    description:
      "Began B.Tech in Computer Science and Engineering at UVCE, Bengaluru.",
    icon: <FaGraduationCap />,
  },
  {
    date: "May 2024 – Mar 2025",
    title: "Member, IEEE UVCE",
    description:
      "Participated in IEEE UVCE Computer Society activities and events.",
    icon: <FaUsers />,
  },
  {
    date: "Dec 2024",
    title: "Won Smart India Hackathon 2024",
    description:
      "First Prize at the SIH 2024 Software Edition Grand Finale with SwiftWork.",
    icon: <FaTrophy />,
  },
  {
    date: "Aug 2025",
    title: "Led Vahani AI Bootcamp",
    description:
      "Team Leader overseeing strategy and execution of the Vahani AI Bootcamp 2025.",
    icon: <FaChalkboardTeacher />,
  },
  {
    date: "Aug 2025",
    title: "2nd Place, GDG UVCE CTF",
    description:
      "Secured 2nd place in a cybersecurity Capture The Flag competition.",
    icon: <FaShieldAlt />,
  },
  {
    date: "Sept 2025",
    title: "Finalist, Recurzive 2.0 Hackathon",
    description: "Advanced to the top 80 out of 1200+ participating teams.",
    icon: <FaFlagCheckered />,
  },
  {
    date: "Sept 2025",
    title: "Special Mention, Bit N Build 2025",
    description:
      "Achieved 3rd place out of 52 teams for innovative project execution.",
    icon: <FaMedal />,
  },
];

function Timeline() {
  return (
    <div className="timeline-wrapper">
      <div className="timeline-track">
        <div className="timeline-line"></div>
        {milestones.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "top" : "bottom"}`}
          >
            <div className="timeline-content">
              <span className="timeline-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="timeline-connector"></div>
            <div className="timeline-node">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
