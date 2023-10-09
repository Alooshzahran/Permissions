using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Entity.Migrations
{
    /// <inheritdoc />
    public partial class _21062023_1718 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "CreationDate", "CreationUserID" },
                values: new object[] { new DateTime(2023, 6, 21, 14, 18, 18, 583, DateTimeKind.Utc).AddTicks(7779), 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 11, 27, 13, 451, DateTimeKind.Local).AddTicks(8837));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 11, 27, 13, 451, DateTimeKind.Local).AddTicks(8844));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 11, 27, 13, 451, DateTimeKind.Local).AddTicks(8846));

            migrationBuilder.UpdateData(
                table: "Role",
                keyColumn: "ID",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 6, 21, 11, 27, 13, 451, DateTimeKind.Local).AddTicks(8847));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                columns: new[] { "CreationDate", "CreationUserID" },
                values: new object[] { new DateTime(2023, 6, 21, 8, 27, 13, 451, DateTimeKind.Utc).AddTicks(8772), 0 });
        }
    }
}
