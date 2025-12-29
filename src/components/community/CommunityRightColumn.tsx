import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { userProfile, mockContributors } from '@/data/mockData';
import { Star, Trophy } from 'lucide-react';

export function CommunityRightColumn() {
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {userProfile.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{userProfile.name}</p>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                <span className="text-xs">{userProfile.stars} stars</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {userProfile.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <CardTitle className="text-sm font-semibold">Weekly Contributors</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockContributors.map((contributor, index) => (
              <div key={contributor.id} className="flex items-center gap-3">
                <span className="text-xs font-semibold text-muted-foreground w-4">
                  {index + 1}.
                </span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {contributor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {contributor.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contributor.doubtsResolved} doubts solved
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
