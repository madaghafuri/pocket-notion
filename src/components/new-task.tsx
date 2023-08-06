import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';

export function NewTask() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>New Task</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col gap-3">
                    <Textarea placeholder="Write something here..." />
                    <Button variant="outline">Create Task</Button>
                </div>
            </CardContent>
        </Card>
    );
}
