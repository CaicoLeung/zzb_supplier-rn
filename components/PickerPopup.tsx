import React from "react";
import { Modal, ModalProps, Pressable, View, Text, PickerProps, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors, tw } from "react-native-tailwindcss";

export interface Options<T> {
  label: string;
  value: T;
}

type PickerPopup<T> = ModalProps & PickerProps & {
  options: Options<T>[];
  onConfirm: (val: T) => void
};

function PickerPopup<T extends string | number>(props: PickerPopup<T>) {
  const [selectedValue, setSelectedValue] = React.useState<T>(props.selectedValue || props.options[0].value);

  return (
    <Modal transparent visible={props.visible} onRequestClose={props.onRequestClose}>
      <View style={[{ flex: 1, justifyContent: "flex-end" }]}>
        <View style={[tw.bgGray500, tw.opacity50, tw.flex1]}  />
        <Modal animated animationType="slide" transparent visible={props.visible} onRequestClose={props.onRequestClose}>
          <Pressable style={[tw.flex1]} onPress={props.onRequestClose} />
          <View style={[tw.bgWhite, tw.flexRow, tw.justifyBetween]}>
            <TouchableOpacity onPress={props.onRequestClose}>
              <Text style={[tw.textLg, tw.pX2, tw.pY3, { color: colors.gray600 }]}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.onConfirm(selectedValue)}>
              <Text style={[tw.textLg, tw.pX2, tw.pY3, { color: colors.blue600 }]}>确认</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={{ justifyContent: "flex-end", backgroundColor: "#fff" }}
            selectedValue={selectedValue}
            onValueChange={setSelectedValue}
          >
            {props.options.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
            ))}
          </Picker>
        </Modal>
      </View>
    </Modal>
  );
};

export default PickerPopup;
