import { Button, Card, Image } from 'semantic-ui-react';
import React from 'react';
import { Node, Status } from '../../model';

interface PullRequestCardProps {
  node: Node;
  onUpdateStatus: (node: Node, status: Status) => void;
  onDeleteNode: (id: string) => void;
}

export const PullRequestCard = (props: PullRequestCardProps) => {
  const { pullRequest, status } = props.node;
  const {onUpdateStatus, onDeleteNode, node} = props;
  let buttons;
  if (status === Status.Opened) {
    buttons = (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={() => onUpdateStatus(node, Status.InReview)}>
            Move to In Review
          </Button>
          <Button basic color="red" onClick={() => onUpdateStatus(node, Status.Approved)}>
            Move to Approved
          </Button>
        </div>
      </Card.Content>
    );
  } else if (status === Status.InReview) {
    buttons = (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={() => onUpdateStatus(node, Status.Opened)}>
          Move to Opened
          </Button>
          <Button basic color="red" onClick={() => onUpdateStatus(node, Status.Approved)}>
            Move to Approved
          </Button>
        </div>
      </Card.Content>
    );
  } else {
    buttons = (
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={() => onUpdateStatus(node, Status.Opened)}>
            Move to Opened
          </Button>
          <Button basic color="red" onClick={() => onUpdateStatus(node, Status.InReview)}>
            Move to In Review
          </Button>
        </div>
      </Card.Content>
    );
  }
  return (
      <Card key={pullRequest.id} style={{height: "30vh"}}>
        <Card.Content>
          <Image floated="right" size="mini" src={pullRequest.authorAvatarUrl} />
          <Card.Header>{pullRequest.title}</Card.Header>
          <Card.Meta>{`Created by ${pullRequest.authorLogin}`}</Card.Meta>
          <Card.Description>{`Status: ${status}`}</Card.Description>
          <Card.Description>{`Created on ${new Date(pullRequest.createdAt).toLocaleDateString()}`}</Card.Description>
        </Card.Content>
        {buttons}
        <Card.Content>
        <Button basic color="red" onClick={() => onDeleteNode(node.pullRequest.id)}>
            Remove
          </Button>
        </Card.Content>
      </Card>
  );
};
