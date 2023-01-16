import {
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Input,
  Table,
} from "@mantine/core";
import { IconArrowBackUp, IconEraser, IconPlus } from "@tabler/icons";
import { ChangeEvent, MouseEvent, useState } from "react";
import { acceptMemberInvitation } from "../../redux/invitation/thunk";
import {
  checkUsernameAction,
  setMessageTargetAction,
  toggleIReplyModalAction,
  toggleMessagerAction,
} from "../../redux/project/slice";
import { toggleDelete, toggleRead } from "../../redux/project/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { Messager } from "./Messager";
import { ReplyModal } from "./ReplyModal";

export function Inbox() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);
  const messageSummary = useAppSelector(
    (state) => state.project.message_summary
  );
  const [search, setSearch] = useState("");
  let messages = messageSummary.filter(
    (message) => message.receiver_id === userId && !message.is_deleted
  );
  messages = messages.filter(
    (message) =>
      message.sender
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      message.message
        ?.toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      new Date(message.created_at).toLocaleString("en-us")?.includes(search)
  );

  const rows = messages.map((message) => {
    const inviteMessage = (
      <div>
        Hello, {message.receiver}. I want to invite you to join my project.
        Please click
        <Button
          variant="subtle"
          value={parseInt(message.message)}
          onClick={(e) => onAcceptInvite(e)}
        >
          Here
        </Button>
        to accept.{" "}
      </div>
    );

    return (
      <tr
        key={message.id}
        className={message.status ? "read-message" : "unread-message"}
      >
        {message.message_type === "message" ? (
          <td>{message.message}</td>
        ) : (
          <td>{inviteMessage}</td>
        )}
        <td>{message.sender}</td>
        <td>{new Date(message.created_at).toLocaleString("en-us")}</td>
        <td>
          <Button
            onClick={(e) => onReply(e)}
            value={message.sender_id!}
            variant="subtle"
            leftIcon={<IconArrowBackUp size={16} />}
          ></Button>
        </td>
        <td>
          <Checkbox
            value={message.id!}
            defaultChecked={message.status}
            onChange={(e) => onToggleRead(e)}
          />
        </td>
        <td>
          <Button
            onClick={(e) => onDelete(e)}
            value={message.id!}
            variant="subtle"
            leftIcon={<IconEraser size={16} />}
          ></Button>
        </td>
      </tr>
    );
  });

  function onAcceptInvite(e: MouseEvent<HTMLButtonElement>) {
    dispatch(acceptMemberInvitation(parseInt(e.currentTarget.value), userId!));
    console.log(e.currentTarget.value);
  }

  function onReply(e: MouseEvent<HTMLButtonElement>) {
    dispatch(setMessageTargetAction(parseInt(e.currentTarget.value)));
    dispatch(toggleIReplyModalAction(true));
  }

  function onDelete(e: MouseEvent<HTMLButtonElement>) {
    dispatch(toggleDelete(parseInt(e.currentTarget.value)));
  }

  function clickHandler() {
    dispatch(checkUsernameAction(false));
    dispatch(toggleMessagerAction(true));
  }

  function onToggleRead(e: ChangeEvent<HTMLInputElement>) {
    dispatch(toggleRead(parseInt(e.currentTarget.value), e.target.checked));
  }
  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }

  return (
    <div style={{ paddingTop: "20px" }}>
      <Container fluid={true}>
        <Input.Wrapper
          id="search"
          withAsterisk
          label="Search"
          error={
            search.length === 0
              ? ""
              : messages.length === 0
              ? "Search not found"
              : undefined
          }
          className="row"
        >
          <Input
            value={search}
            onChange={(e) => onSearch(e)}
            id="search"
            placeholder="Content/Name/Date Search"
          />
        </Input.Wrapper>
        <Container fluid={true} style={{ paddingTop: "20px" }}>
          <Center style={{ padding: "20px" }}>
            <Button
              onClick={clickHandler}
              variant="outline"
              rightIcon={<IconPlus size={14} />}
            >
              New Message
            </Button>
          </Center>
          <Table horizontalSpacing="sm">
            <thead>
              <tr>
                <th style={{ width: "500px" }}>Message</th>
                <th style={{ width: "100px" }}>Sender</th>
                <th style={{ width: "120px" }}>Received On</th>
                <th style={{ width: "40px" }}>Reply</th>
                <th style={{ width: "100px" }}>Mark As Read</th>
                <th style={{ width: "40px" }}>Delete</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
        {messages.length === 0 && (
          <Center style={{ padding: "20px" }}>
            <Card style={{ color: "#238BE6" }}>You Have No New Messages</Card>
          </Center>
        )}
      </Container>
      <Messager />
      <ReplyModal />
    </div>
  );
}
