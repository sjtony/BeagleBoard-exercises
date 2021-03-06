#
# For i2c 1 wire with
# P9_24 SCL
# P9_26 SDA

git clone https://github.com/pimoroni/mlx90640-library.git
sudo apt install libi2c-dev

cd mlx90640-library
git apply ../bone.patch     # Sets the i2c speed to 100,000

# To autostart
# sudo cp IRarray.service /lib/systemd/system
# sudo systemctl start IRarray
# To make it run on startup
# sudo systemctl enable IRarray

# You can also
# sudo systemctl stop IRarray
# sudo systemctl disenable IRarray


# For Python
# sudo apt install swig

wget https://github.com/beagleboard/bb.org-overlays/raw/master/src/arm/BB-I2C1-FAST-00A0.dts

dtc -O dtb -o BB-I2C1-FAST-may-00A0.dtbo BB-I2C1-FAST-00A0.dts
