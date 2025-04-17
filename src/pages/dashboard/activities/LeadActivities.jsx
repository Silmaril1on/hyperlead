import CardContainer from "@/components/containers/CardContainer";
import IconContainer from "@/components/containers/IconContainer";
import MotionChildren from "@/components/containers/MotionChildren";
import MotionContainer from "@/components/containers/MotionContainer";
import Spinner from "@/components/Spinner";
import SubTitle from "@/components/SubTitle";
import Title from "@/components/Title";
import { MdLeaderboard, MdSubscriptions } from "react-icons/md";

const LeadActivities = ({ data }) => {
  if (!data) {
    return <Spinner />;
  }

  const activities = [
    {
      title: "Current Plan",
      value: data.subscription,
      icon: <MdSubscriptions />,
    },
    {
      title: "Monthly Leads",
      value: data.monthly_leads,
      icon: <MdLeaderboard />,
    },
    {
      title: "Leads Received This Month",
      value: data.leads_received_this_month,
      icon: <MdLeaderboard />,
    },
    {
      title: "Total Leads Received",
      value: data.total_leads_received,
      icon: <MdLeaderboard />,
    },
  ];

  return (
    <MotionContainer
      animation="fade-in"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-2"
    >
      {activities.map((activity, index) => (
        <MotionChildren key={index} animation="fade-in">
          <CardContainer className="space-y-1 capitalize">
            <IconContainer size="sm" className="text-xl">
              {activity.icon}
            </IconContainer>
            <div>
              <SubTitle>{activity.title}</SubTitle>
              <Title
                className={`text-blue-600 font-thin ${
                  activity.className || ""
                }`}
              >
                {activity.value}
              </Title>
            </div>
          </CardContainer>
        </MotionChildren>
      ))}
    </MotionContainer>
  );
};

export default LeadActivities;
