
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

interface LearnCardProps {
  title: string;
  description: string;
  category: string;
  timeToRead: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  link: string;
  image?: string;
}

const LearnCard = ({ 
  title, 
  description, 
  category, 
  timeToRead,
  difficulty,
  link,
  image
}: LearnCardProps) => {
  const difficultyColor = {
    beginner: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    intermediate: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    advanced: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <Badge variant="outline">{timeToRead}</Badge>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={link}>
            <BookOpen className="mr-2 h-4 w-4" />
            Start Learning
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearnCard;
