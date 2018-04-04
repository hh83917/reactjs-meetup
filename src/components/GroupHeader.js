import React from 'react';
import Card, { CardHeader, CardContent, CardMedia } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

const GroupHeader = ({ group }) =>
    <Card style={{ width: '800px' }}>
        <CardHeader title={group.name} />
        <CardMedia style={{ height: '300px' }} image={`${group.key_photo.highres_link}`} title='Group photo'/>
        <CardContent>
            <div className='group-members'>Members: {(group.members || 0).toLocaleString()}</div>
            <div dangerouslySetInnerHTML={{ __html: group.description }} />
            <div className='group-organizer'>
                Group organizer:
                <div className='organizer-name'>
                    <Avatar
                        alt={group.organizer.name}
                        src={group.organizer.photo.thumb_link}
                    />
                    <span style={{ paddingLeft: '10px' }}>{group.organizer.name}</span>
                </div>
            </div>
        </CardContent>
    </Card>;

export default GroupHeader;