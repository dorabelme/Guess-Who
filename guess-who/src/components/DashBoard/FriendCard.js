import "semantic-ui-css/semantic.min.css";
import "./dashboard.scss";
import React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const FriendCard = props => (
  console.log("highscore:", props),
  (
    <Table basic="very" striped className="friendCard">
      <Table.Body>
        <Table.Row>
          <Table.Cell className="tableCell">
            <div className="cell-div">
              <Image
                src={props.imgSrc}
                rounded
                size="mini"
                className="card-imgs"
              />
              <p>{props.username}</p>
            </div>
          </Table.Cell>
          <Table.Cell textAlign="right" className="tableCell">
            {props.highscore}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
);

export default FriendCard;