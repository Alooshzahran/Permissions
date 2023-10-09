using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _26062023_1040 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Module",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "Module",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9809));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9823));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9826));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 10, 41, 16, 486, DateTimeKind.Local).AddTicks(9828));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 26, 7, 41, 16, 486, DateTimeKind.Utc).AddTicks(9683));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "File",
                table: "Module");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Module",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 17, 18, 18, 583, DateTimeKind.Local).AddTicks(7874));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 17, 18, 18, 583, DateTimeKind.Local).AddTicks(7892));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 17, 18, 18, 583, DateTimeKind.Local).AddTicks(7894));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 17, 18, 18, 583, DateTimeKind.Local).AddTicks(7895));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 14, 18, 18, 583, DateTimeKind.Utc).AddTicks(7779));
        }
    }
}
